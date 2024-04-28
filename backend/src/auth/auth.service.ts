import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDTO, RegisterDTO } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private user: UserService,
  ) {}

  /**
   * Recibe los datos de un usuario y lo registra.
   *
   * Genera y devuelve un JWT al finalizar.
   * @param dto El DTO correspondiente al Registro de usuarios
   * @returns
   */
  async register(dto: RegisterDTO) {
    try {
      // crear el usuario en la base de datos
      const user = await this.user.createUser(dto);

      // retornar el JWT
      return this.signToken(user.id, user.email);
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
   * Verifica las credenciales de un usuario y, si corresponde, genera y devuelve un JWT.
   * @param dto El DTO correspondiente al Login de usuarios
   */
  async login(dto: LoginDTO) {
    // recuperar el usuario
    const user = await this.prisma.usuario.findUnique({
      where: {
        email: dto.email,
      },
    });
    // si no existe throw error
    if (!user)
      throw new ForbiddenException('El correo no se encuentra registrado');
    // comparar la contraseña
    const passwordsMatch = await argon.verify(user.hash, dto.password);
    // si no coincide throw error
    if (!passwordsMatch)
      throw new ForbiddenException('La contraseña introducida es incorrecta');
    // return token
    return this.signToken(user.id, user.email);
  }

  /**
   * Firma el token pasado en la función.
   * Depende del secreto establecido en .env.
   */
  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    // si por alguna razon no existen los parametros
    if (!userId || !email)
      throw new InternalServerErrorException(
        'La solicitud de firma no pudo procesar correctamente',
      );

    // definir la payload
    const payload = {
      sub: userId,
      email,
    };

    // recuperar el secreto para firmar el token
    const secret = this.config.get('JWT_SECRET');

    // firmar el token con el secreto y establecer su fecha de expiración
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: secret,
    });

    // convención de retorno de access_token
    return {
      access_token: token,
    };
  }
}
