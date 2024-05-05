import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class HomestayService {
  constructor(private prisma: PrismaService) {}

  public getAllHomeStays() {
    return this.prisma.propiedad.findMany();
  }

  public async getHomeStayById(id: number) {
    const homeStay = await this.prisma.propiedad.findUnique({ where: { id } });
    if (homeStay == null) {
      throw new HttpException('HomeStay Not Found', 404);
    }
    return homeStay;
  }

  public createHomeStay(
    ownerId: number,
    data: Prisma.PropiedadCreateWithoutOwnerInput,
  ) {
    return this.prisma.propiedad.create({
      data: {
        ...data,
        ownerId,
      },
    });
  }

  public async updateHomeStay(id: number, data: Prisma.PropiedadUpdateInput) {
    const findHomeStay = await this.getHomeStayById(id);
    if (findHomeStay) {
    }
    return this.prisma.propiedad.update({ where: { id }, data });
  }

  public async deleteHomeStay(id: number) {
    const findHomeStay = await this.getHomeStayById(id);
    if (findHomeStay) {
    }
    return this.prisma.propiedad.delete({ where: { id } });
  }
}
