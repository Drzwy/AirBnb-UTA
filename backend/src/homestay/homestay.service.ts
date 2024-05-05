import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomestayCreateDTO } from './dto/homestayCreate.dto';

@Injectable()
export class HomestayService {
  constructor(private prismaService: PrismaService) {}

  async createHomestay(dto: HomestayCreateDTO) {
    return this.prismaService.propiedad.create({
      data: {
        nombre: dto.nombre,
        huespedId: dto.huespedId,
        anfitrionId: dto.anfitrionId,
      },
    });
  }

  async getAllHomestays() {
    return this.prismaService.propiedad.findMany();
  }
}
