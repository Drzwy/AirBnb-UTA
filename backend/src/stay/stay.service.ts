import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Hospedaje, Propiedad, StayState, Usuario } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { StayIdsDTO, SolicitStayDTO } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ModifyStayDTO } from './dto/stayModify.dto';

@Injectable()
export class StayService {
  constructor(private prismaService: PrismaService) {}

  async getAllStays(): Promise<Hospedaje[]> {
    const stays: Hospedaje[] = await this.prismaService.hospedaje.findMany({
      include: { Propiedad: true, Huesped: true },
    });

    if (stays.length == 0)
      throw new NotFoundException(
        'No existen hospedajes inscritos en la base de datos',
      );

    return stays;
  }

  async getStaysByPropertyId(propertyId: number): Promise<Hospedaje[]> {
    const stays: Hospedaje[] = await this.prismaService.hospedaje.findMany({
      where: { propiedadId: propertyId },
      include: { Huesped: true },
    });

    if (stays.length == 0)
      throw new NotFoundException(
        'No hay hospedajes inscritos para esta propiedad',
      );

    return stays;
  }

  async getStaysByGuestId(userId: number): Promise<Hospedaje[]> {
    const stays: Hospedaje[] = await this.prismaService.hospedaje.findMany({
      where: { huespedId: userId },
      include: { Propiedad: true },
    });

    if (stays.length == 0)
      throw new NotFoundException(
        'No hay hospedajes inscritos para este usuario',
      );

    return stays;
  }

  async getStaysByHostId(hostId: number): Promise<HostRequestsToStay[]> {
    try {
      const properties: Propiedad[] =
        await this.prismaService.propiedad.findMany({
          where: {
            anfitrionId: hostId,
          },
        });

      const stayRequests: HostRequestsToStay[] = [];
      for (const property of properties) {
        const stayRequest = new HostRequestsToStay();

        stayRequest.propiedad = property;

        const stays: Hospedaje[] = await this.getStaysByPropertyId(property.id);

        for (const stay of stays) {
          const guest: Usuario = await this.prismaService.usuario.findUnique({
            where: {
              id: stay.huespedId,
            },
          });
          stayRequest.hospedajes.push({ hospedaje: stay, huesped: guest });
        }

        stayRequests.push(stayRequest);
      }

      return stayRequests;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(error);
        } else {
          throw new InternalServerErrorException(error);
        }
      } else {
        throw error;
      }
    }
  }

  async getStayById(ids: StayIdsDTO): Promise<Hospedaje> {
    const stay: Hospedaje = await this.prismaService.hospedaje.findUnique({
      where: {
        id_huespedId_propiedadId: {
          id: ids.id,
          huespedId: ids.huespedId,
          propiedadId: ids.propiedadId,
        },
      },
      include: {
        Huesped: true,
        Propiedad: true,
      },
    });

    return stay;
  }

  async solicitStay(dto: SolicitStayDTO) {
    try {
      const stay: Hospedaje = await this.prismaService.hospedaje.create({
        data: dto,
        include: {
          Huesped: true,
          Propiedad: true,
        },
      });

      return stay;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Hospedaje ya existe para el usuario y propiedad incluidos',
          );
        } else if (error.code === 'P2025') {
          throw new NotFoundException(
            'El usuario o propiedad incluidos no existen',
          );
        } else {
          throw error;
        }
      }
    }
  }

  async acceptStay(ids: StayIdsDTO): Promise<Hospedaje> {
    return await this.updateStay(ids, StayState.ACEPTADO);
  }

  async rejectStay(ids: StayIdsDTO): Promise<Hospedaje> {
    return await this.updateStay(ids, StayState.RECHAZADO);
  }

  async cancelStay(ids: StayIdsDTO): Promise<Hospedaje> {
    try {
      const stay: Hospedaje = await this.prismaService.hospedaje.update({
        where: {
          id_huespedId_propiedadId: ids,
        },
        data: {
          estaActivo: false,
        },
      });

      return stay;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'El usuario o propiedad incluidos no existen',
          );
        } else {
          throw error;
        }
      }
    }
  }

  async modifyStay(dto: ModifyStayDTO): Promise<Hospedaje> {
    try {
      // deberia estar en el servicio de homestays
      const { fechasOcupadas: availableDates } =
        await this.prismaService.propiedad.findUnique({
          select: {
            fechasOcupadas: true,
          },
          where: {
            id: dto.ids.propiedadId,
          },
        });

      const isAvailable: boolean = this.verifyAvailability(
        dto.fechaIni,
        dto.fechaFin,
        availableDates,
      );

      if (!isAvailable) {
        throw new ForbiddenException(
          'Las fechas introducidas no están disponibles para la propiedad',
        );
      }

      const stay: Hospedaje = await this.prismaService.hospedaje.update({
        where: {
          id_huespedId_propiedadId: dto.ids,
        },
        data: {
          ...dto,
        },
      });

      return stay;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'El usuario o propiedad incluidos no existen',
          );
        } else {
          throw error;
        }
      }
    }
  }

  private async updateStay(
    ids: StayIdsDTO,
    state: StayState,
  ): Promise<Hospedaje> {
    try {
      const stay: Hospedaje = await this.prismaService.hospedaje.update({
        where: {
          id_huespedId_propiedadId: ids,
        },
        data: {
          estadoAceptacion: state,
        },
      });

      return stay;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === '2025') {
          throw new NotFoundException(
            'El usuario o propiedad incluidos no existen',
          );
        } else {
          throw error;
        }
      }
    }
  }

  private verifyAvailability(
    iniDate: Date,
    endDate: Date,
    availableDates: Date[],
  ): boolean {
    if (availableDates.length === 0)
      throw new ForbiddenException(
        'No hay fechas disponibles para la propiedad',
      );

    const wantedDays: Date[] = this.generateDateRangeArray(iniDate, endDate);

    const availableDays: Set<number> = new Set(
      availableDates.map((date) => date.getTime()),
    );

    return wantedDays.every((date) => availableDays.has(date.getTime()));
  }

  private generateDateRangeArray(iniDate: Date, endDate: Date): Date[] {
    const currentDate: Date = new Date(iniDate);
    const dateArray: Date[] = [];

    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  }
}

export class HostRequestsToStay {
  propiedad: Propiedad;
  hospedajes: { hospedaje: Hospedaje; huesped: Usuario }[];

  constructor() {
    this.hospedajes = [];
  }
}
