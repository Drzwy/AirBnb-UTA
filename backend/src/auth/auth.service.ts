import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDTO } from './dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { UserRegisterDTO } from 'src/user/dto';
import { Usuario } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  /**
   * Recibe los datos de un usuario y lo registra.
   *
   * Genera y devuelve un JWT al finalizar.
   * @param dto El DTO correspondiente al Registro de usuarios
   * @returns
   */
  async register(dto: UserRegisterDTO) {
    // crear el usuario en la base de datos
    const user: Usuario = await this.userService.registerUser(dto);

    // retornar el JWT
    return this.signToken(user.id, user.email);
  }

  /**
   * Verifica las credenciales de un usuario y, si corresponde, genera y devuelve un JWT.
   * @param dto El DTO correspondiente al Login de usuarios
   */
  async login(dto: LoginDTO) {
    // recuperar el usuario
    const user: Usuario = await this.prismaService.usuario.findUnique({
      where: {
        email: dto.email,
      },
    });
    // si no existe throw error
    if (!user)
      throw new ForbiddenException('El correo no se encuentra registrado');
    // comparar la contraseña
    const passwordsMatch: boolean = await argon.verify(user.hash, dto.password);
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
    const secret: string = this.configService.get('JWT_SECRET');

    // firmar el token con el secreto y establecer su fecha de expiración
    const token: string = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
      secret: secret,
    });

    // convención de retorno de access_token
    return {
      access_token: token,
    };
  }
}
