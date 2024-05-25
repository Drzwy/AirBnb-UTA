import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRegisterDTO } from './dto';
import * as argon from 'argon2';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { UserTypes, Usuario } from '@prisma/client';
import { UserCreateDTO } from './dto/userCreate.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  /**
   * Recibe un formato de registro para inscribir clientes dentro de la base de datos.
   * @param dto Formato de Registro
   * @returns Usuario con tipo Cliente creado
   */
  async registerUser(dto: UserRegisterDTO) {
    const password: string = dto.password;
    delete dto.password;
    const createDto: UserCreateDTO = Object.assign({}, dto, {
      tipo_usuario: UserTypes.Cliente,
      hash: password,
    });

    return this.createUser(createDto);
  }

  /**
   * Recibe los datos de un usuario y lo guarda en la base de datos
   * @param dto El DTO correspondiente a la creación de un usuario
   * @returns Usuario creado
   */
  async createUser(dto: UserCreateDTO) {
    const hash: string = await argon.hash(dto.hash);
    dto.hash = hash;

    try {
      const user: Usuario = await this.prismaService.usuario.create({
        data: dto,
      });
      return user;
    } catch (error) {
      // si las credenciales estan duplicadas throw error
      if (error instanceof PrismaClientKnownRequestError) {
        // error code predefinido de prisma
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credenciales duplicadas');
        }
      } else {
        throw error;
      }
    }
  }

  /**
   * Recibe un ID de usuario y retorna sus datos
   * @param userId ID del usuario
   * @returns Usuario encontrado
   */
  async getUserById(userId: number) {
    const user: Usuario = await this.prismaService.usuario.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException('El usuario no existe');

    return user;
  }

  /**
   * Retorna todos los usuarios de la BD.
   * @returns Usuarios dentro de la BD
   */
  async getAllUsers() {
    const users: Usuario[] = await this.prismaService.usuario.findMany();
    if (users.length == 0)
      throw new NotFoundException('No existen usuarios registrados');
    return users;
  }

  /**
   * Borra el usuario dado un ID.
   * @param userId ID del usuario
   * @returns Usuario Borrado
   */
  async deleteUserById(userId: number) {
    try {
      const deletedUser: Usuario = await this.prismaService.usuario.delete({
        where: {
          id: userId,
        },
      });
      return deletedUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'El usuario que se quiere eliminar no existe',
          );
        } else {
          throw error;
        }
      }
    }
  }

  /**
   * Actualiza los datos de un usuario dado su ID y el DTO correspondiente.
   * @param userId ID del Usuario
   * @param dto DTO para la actualización de datos
   * @returns Usuario Actualizado
   */
  async updateUserById(userId: number, dto: UserUpdateDto) {
    try {
      if (dto.hash) dto.hash = await argon.hash(dto.hash);

      const user: Usuario = await this.prismaService.usuario.update({
        where: {
          id: userId,
        },
        data: dto,
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            'El usuario que se quiere actualizar no existe',
          );
        } else if (error.code === 'P2002') {
          throw new ForbiddenException('Credenciales duplicadas');
        } else {
          throw error;
        }
      }
    }
  }
}
