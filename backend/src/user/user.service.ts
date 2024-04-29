import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserCreateDTO } from './dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Recibe los datos de un usuario y lo guarda en la base de datos
   * @param dto El DTO correspondiente a la creación de un usuario
   * @returns {Usuario} Retorna una Promesa de un objeto Usuario (Definido por Prisma)
   */
  async createUser(dto: UserCreateDTO) {
    const hash = await argon.hash(dto.password);

    return this.prisma.usuario.create({
      data: {
        email: dto.email,
        hash: hash,
        run: dto.run,
        nombre: dto.nombre,
        apellidoPat: dto.apellidoPat,
        apellidoMat: dto.apellidoMat,
        descripcion: dto.descripcion,
        idiomas: dto.idiomas,
        detalles: dto.detalles,
      },
    });
  }
}
