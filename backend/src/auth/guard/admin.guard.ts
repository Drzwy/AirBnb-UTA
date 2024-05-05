import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

export class AdminGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // console.log({ user: request.user });
    const user = await this.userService.getUserById(request.user.id);
    // FIXME: esta cosa no funciona por alguna razon
    console.log({ user });
    console.log(user.tipo_usuario.valueOf());
    const role = user.tipo_usuario.valueOf();
    if (role === 'Admin') return true;
    else return false;
  }
}
