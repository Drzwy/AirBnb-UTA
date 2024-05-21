import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginRegisterService } from '../services/login-register.service';

export const authGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginRegisterService);
  return login.isAuth();
};

export const loginGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginRegisterService);
  return login.isLoggedIn();
}

export const adminGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginRegisterService);
  return login.isAdmin();
}

export const hostGuard: CanActivateFn = (route, state) =>{
  const login = inject(LoginRegisterService);
  return login.isHost();
}