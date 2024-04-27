import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDTO, RegisterDTO } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async login(dto: LoginDTO) {
    // recuperar el usuario
    const usuario = await this.prismaService.usuario.findUnique({
      where: {
        email: dto.email,
      },
    });
    // si no existe throw error
    if (!usuario)
      throw new ForbiddenException('El correo no se encuentra registrado');
    // comparar la contraseña
    const comparison = await argon.verify(usuario.hash, dto.password);
    // si no coincide throw error
    if (!comparison)
      throw new ForbiddenException('La contraseña introducida es incorrecta');
    // return usuario
    return usuario;
  }

  async register(dto: RegisterDTO) {
    // hashear la contraseña
    const hash = await argon.hash(dto.password);
    // crear el usuario en la base de datos
    try {
      const user = await this.prismaService.usuario.create({
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

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credenciales duplicadas');
        }
      } else {
        throw error;
      }
    }
  }
}
