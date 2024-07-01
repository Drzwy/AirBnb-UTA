import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    //console.log(request);
    try {
      if (data) return request.user[data];
      return request.user;
    } catch (error) {
      console.warn('ERROR EN EL DECORADOR @USER');
      console.error(error);
    }
  },
);
