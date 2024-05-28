import { AuthGuard } from '@nestjs/passport';

export class AdminJwtGuard extends AuthGuard('adminjwt') {
  constructor() {
    super();
  }
}
