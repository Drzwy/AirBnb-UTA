import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Propiedad, Usuario } from '@prisma/client';
import { HomeStayUpdateDTO, HomeStayCreateDTO } from './dto';
import { HomeStayFilterDTO } from './dto/homeStayFilter.dto';

@Injectable()
export class HomestayService {
  constructor(private prisma: PrismaService) {}

  public async getAllHomeStays(): Promise<Propiedad[]> {
    return this.prisma.propiedad.findMany({
      where: { estaActivo: true },
    });
  }

  public async getHomeStayById(id: number): Promise<Propiedad> {
    const homeStay: Propiedad = await this.prisma.propiedad.findUnique({
      where: { id, estaActivo: true },
    });

    if (!homeStay) {
      throw new NotFoundException('No se encontró la propiedad');
    }

    return homeStay;
  }

  public async getAllHomeStaysByUserId(id: number): Promise<Propiedad[]> {
    const ownerExists: Usuario = await this.prisma.usuario.findUnique({
      where: { id: id },
    });

    if (!ownerExists) {
      throw new NotFoundException('El propietario no existe');
    }

    return this.prisma.propiedad.findMany({
      where: { estaActivo: true, anfitrionId: id },
    });
  }

  public async createHomeStay(data: HomeStayCreateDTO): Promise<Propiedad> {
    const ownerExists: Usuario = await this.prisma.usuario.findUnique({
      where: { id: data.anfitrionId },
    });

    if (!ownerExists) {
      throw new NotFoundException('El propietario no existe');
    }

    try {
      const newHomeStay: Propiedad = await this.prisma.propiedad.create({
        data,
      });
      return newHomeStay;
    } catch (error) {
      if (error.code == 'P2002') {
        throw new ForbiddenException('La ubicacion de la propiedad ya existe');
      }
      throw new InternalServerErrorException(error);
    }
  }

  public async updateHomeStay(
    id: number,
    data: HomeStayUpdateDTO,
  ): Promise<Propiedad> {
    const homeStay: Propiedad = await this.prisma.propiedad.findUnique({
      where: { id, estaActivo: true },
    });

    if (!homeStay) {
      throw new NotFoundException('No se encontro la propiedad');
    }

    try {
      const updatedHomeStay: Propiedad = await this.prisma.propiedad.update({
        where: { id },
        data,
      });
      return updatedHomeStay;
    } catch (error) {
      if (error.code == 'P2003') {
        throw new NotFoundException('El propietario no existe');
      }
    }
  }

  public async deleteHomeStay(id: number) {
    try {
      const homeStay: Propiedad = await this.prisma.propiedad.findUnique({
        where: { id, estaActivo: true },
      });

      if (!homeStay) {
        throw new NotFoundException('No se encontro la propiedad');
      }

      return this.prisma.propiedad.update({
        where: { id },
        data: { estaActivo: false },
      });
    } catch (error) {
      throw new InternalServerErrorException('Ocurrio un problema');
    }
  }

  public async getHomeStayWithFilters(filters: HomeStayFilterDTO) {
    try {
      const where: Prisma.PropiedadWhereInput = {
        estaActivo: true,
        dormitorios: { gte: filters.dormitorios },
        camas: { gte: filters.camas },
        banos: { gte: filters.banos },
        precioNoche: {
          gte: filters.precioNocheMin,
          lte: filters.precioNocheMax,
        },
        maxAdultos: { gte: filters.nroAdultos },
        maxNinos: { gte: filters.nroNinos },
        maxBebes: { gte: filters.nroBebes },
        maxMascotas: { gte: filters.nroMascotas },
        tipo: filters.tipo,
        pais: filters.pais,
        ciudad: filters.ciudad,
      };
      return this.prisma.propiedad.findMany({ where });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
