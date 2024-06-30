import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePMDTO, ModifyPMDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { MetodoDePago } from '@prisma/client';

@Injectable()
export class PaymentMethodService {
  constructor(private prismaService: PrismaService) {}

  async getAllPM(): Promise<MetodoDePago[]> {
    try {
      const pms = await this.prismaService.metodoDePago.findMany();
      return pms;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(`prisma error: \n${error}`);
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getPMsFromUserId(userId: number): Promise<MetodoDePago[]> {
    try {
      const pms = this.prismaService.metodoDePago.findMany({
        where: { propietarioId: userId },
      });

      return pms;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(`prisma error: \n${error}`);
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async getPMFromUserIdById(userId: number, pmId: number) {
    try {
      const pm = this.prismaService.metodoDePago.findMany({
        where: {
          id: pmId,
          propietarioId: userId,
        },
      });

      return pm;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(`prisma error: \n${error}`);
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async createNewPM(userId: number, data: CreatePMDTO) {
    try {
      const pm = this.prismaService.metodoDePago.create({
        data: {
          propietarioId: userId,
          infoTarjeta: data.infoTarjeta,
        },
      });

      return pm;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'No se puede insertar un método de pago con llaves duplicadas',
          );
        }
        console.error(`prisma error: \n${error}`);
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async modifyPM(userId: number, pmId: number, data: ModifyPMDTO) {
    try {
      const pm = this.prismaService.metodoDePago.update({
        where: {
          id_propietarioId: {
            id: pmId,
            propietarioId: userId,
          },
        },
        data: data,
      });

      return pm;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'El método de pago referenciado no existe',
          );
        }
        console.error(`prisma error: \n${error}`);
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }

  async deletePM(userId: number, pmId: number) {
    try {
      const pm = this.prismaService.metodoDePago.delete({
        where: {
          id_propietarioId: {
            id: pmId,
            propietarioId: userId,
          },
        },
      });

      return pm;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'El método de pago referenciado no existe',
          );
        }
        console.error(`prisma error: \n${error}`);
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
}
