import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { HomeStayCreateDTO } from './dto';

@Injectable()
export class HomestayService {
  constructor(private prisma: PrismaService) {}

  public getAllHomeStays() {
    return this.prisma.propiedad.findMany();
  }

  public async getHomeStayById(id: number) {
    const homeStay = await this.prisma.propiedad.findUnique({ where: { id } });
    if (!homeStay) {
      throw new HttpException('No se encontro la propiedad', 404);
    }
    return homeStay;
  }

  public async createHomeStay(data: HomeStayCreateDTO) {
    const ownerExists = await this.prisma.usuario.findUnique({
      where: { id: data.anfitrionId },
    });
    if (!ownerExists) {
      throw new HttpException('El propietario no existe', 404);
    }

    try {
      const createHomeStay = await this.prisma.propiedad.create({
        data: {
          ...data,
        },
      });
      return createHomeStay;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async updateHomeStay(id: number, data: Prisma.PropiedadUpdateInput) {
    const homeStay = await this.prisma.propiedad.findUnique({
      where: { id },
    });
    if (homeStay == null) {
      throw new HttpException('No se encontro la propiedad', 404);
    }
    try {
      const updateHomeStay = await this.prisma.propiedad.update({
        where: { id },
        data,
      });
      return updateHomeStay;
    } catch (error) {
      if (error.code == 'P2003') {
        throw new HttpException('El propietario no existe', 404);
      }
    }
  }

  public async deleteHomeStay(id: number) {
    const homeStay = await this.prisma.propiedad.findUnique({
      where: { id },
    });
    if (homeStay == null) {
      throw new HttpException('No se encontro la propiedad', 404);
    }
    return this.prisma.propiedad.delete({ where: { id } });
  }
}
