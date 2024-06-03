import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserTypes, Usuario } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { User } from './decorator';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { UserCreateDTO } from './dto/userCreate.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  UAE: UnauthorizedException = new UnauthorizedException(
    'No está autorizado para acceder a este recurso',
  );
  BRE: BadRequestException = new BadRequestException(
    'El parámetro introducido no tiene el formato correcto',
  );

  constructor(private userService: UserService) {}

  /**
   * Ruta para obtener a todos los usuarios registrados.
   * @returns Usuarios encontrados
   */
  @Get()
  getAllUsers(@User('tipoUsuario') userType: UserTypes) {
    if (userType == UserTypes.Cliente) throw this.UAE;
    return this.userService.getAllUsers();
  }

  /**
   * Ruta para obtener el usuario logeado.
   * @param user Usuario logeado
   * @returns Datos del Usuario logeado
   */
  @Get('me')
  getMe(@User() user: Usuario) {
    return this.userService.getUserById(user.id);
  }

  /**
   * Ruta para obtener un usuario dado un ID.
   * @param userId ID del usuario
   * @returns Usuario encontrado
   */
  @Get(':userId')
  getUserById(@Param('userId') userId: string) {
    if (isNaN(parseInt(userId))) throw this.BRE;

    return this.userService.getUserById(+userId);
  }

  /**
   * Ruta para crear un usuario dado el DTO correspondiente.
   *
   * Requiere privilegios de administrador.
   * @param dto DTO para crear usuario como administrador
   * @returns Usuario creado
   */
  @Post()
  createUser(
    @User('tipoUsuario') userType: UserTypes,
    @Body() dto: UserCreateDTO,
  ) {
    if (userType == UserTypes.Cliente) throw this.UAE;
    return this.userService.createUser(dto);
  }

  /**
   * Ruta para eliminar un usuario dado un ID.
   *
   * Requiere privilegios de administrador.
   * @param userId ID del Usuario
   * @returns Usuario borrado
   */
  @Delete(':userId')
  deleteUserById(
    @User('tipoUsuario') userType: UserTypes,
    @Param('userId') userId: string,
  ) {
    if (isNaN(parseInt(userId))) throw this.BRE;
    if (userType == UserTypes.Cliente) throw this.UAE;
    return this.userService.deleteUserById(+userId);
  }

  /**
   * Ruta para actualizar los datos del usuario loggeado
   * @param userId ID del Usuario
   * @param dto DTO para actualizar el usuario
   * @returns Usuario actualizado
   */
  @Patch()
  updateLoggedUser(@User('id') userId: number, @Body() dto: UserUpdateDto) {
    return this.userService.updateUserById(userId, dto);
  }

  /**
   * Ruta para actualizar los datos de un usuario dado un ID y el DTO correspondiente
   * @param userId ID del Usuario
   * @param dto DTO para actualizar el usuario
   * @returns Usuario actualizado
   */
  @Patch(':userId')
  updateUserById(
    @User('tipoUsuario') userType: UserTypes,
    @Param('userId') userId: string,
    @Body() dto: UserUpdateDto,
  ) {
    if (isNaN(parseInt(userId))) throw this.BRE;
    if (userType == UserTypes.Cliente) throw this.UAE;
    return this.userService.updateUserById(+userId, dto);
  }
}
