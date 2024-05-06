import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { User } from './decorator';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { UserCreateDTO } from './dto/userCreate.dto';

@UseGuards(JwtGuard) // desactivar para probar
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Ruta para obtener el usuario logeado.
   * @param user Usuario logeado
   * @returns Datos del Usuario logeado
   */
  @Get('me')
  getMe(@User() user: Usuario) {
    return user;
  }

  /**
   * Ruta para obtener un usuario dado un ID.
   * @param userId ID del usuario
   * @returns Usuario encontrado
   */
  @Get('get/:userId')
  getUserById(@Param('userId') userId: string) {
    return this.userService.getUserById(+userId);
  }

  /**
   * Ruta para obtener a todos los usuarios registrados.
   * @returns Usuarios encontrados
   */
  @Get('get')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  /**
   * Ruta para crear un usuario dado el DTO correspondiente.
   *
   * Requiere privilegios de administrador.
   * @param dto DTO para crear usuario como administrador
   * @returns Usuario creado
   */
  @Post('create')
  createUser(@Body() dto: UserCreateDTO) {
    //TODO guard de admin
    return this.userService.createUser(dto);
  }

  /**
   * Ruta para eliminar un usuario dado un ID.
   *
   * Requiere privilegios de administrador.
   * @param userId ID del Usuario
   * @returns Usuario borrado
   */
  @Delete('delete/:userId')
  deleteUserById(@Param('userId') userId: string) {
    //TODO guard de admin
    return this.userService.deleteUserById(+userId);
  }

  /**
   * Ruta para actualizar los datos de un usuario dado un ID y el DTO correspondiente
   *
   * IMPORTANTE: Se deben incluir todos los datos que NO se modifican. Si no se proporcionan, quedarán en blanco
   * @param userId ID del Usuario
   * @param dto DTO para actualizar el usuario
   * @returns Usuario actualizado
   */
  @Patch('patch/:userId')
  updateUserById(@Param('userId') userId: string, @Body() dto: UserUpdateDto) {
    return this.userService.updateUserById(+userId, dto);
  }
}
