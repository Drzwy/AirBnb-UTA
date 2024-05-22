import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { userRegister } from '../components/register/register.component';
import { catchError, map, Observable, of } from 'rxjs';
import { userLogin } from '../components/login/login.component';
import { jwtDecode } from "jwt-decode";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

constructor(
  private router: Router,
  private http: HttpClient

) {this.checkTokenExpiration()};

// private url = 'http://localhost:3000/auth' no se uso por que agregue el proxy, me daba error de cors si no lo ponia
public clientType = 'Guest'


public register(user: userRegister): Observable<{ success: boolean, message?: string }> {
  return this.http.post<{ access_token: string }>('auth/register', user).pipe(
    map(result => {
      if (result && result.access_token) {
        sessionStorage.setItem('token', result.access_token);
        return { success: true };
      }
      return { success: false, message: 'Unknown error' };
    }),
    catchError(error => {
      console.error('Error during registration', error);
      let errorMessage = 'An unknown error occurred';
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
      return of({ success: false, message: errorMessage });
    })
  );
}

public login(user: userLogin): Observable<{ success: boolean, message?: string }> {
  console.log(this.clientType)
  return this.http.post<any>('auth/login', user).pipe(
    map(result => {
      if (result && result.access_token) {
        sessionStorage.setItem('token', result.access_token);
        return { success: true };
      }
      return { success: false };
    }),
    catchError(error => {
      console.error('Error durante el inicio de sesion', error);
      let errorMessage = '';
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
      return of({ success: false, message: errorMessage });
    })
  );
}
private checkTokenExpiration() {
  const token = sessionStorage.getItem('token');
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const expirationTimeInSeconds: number = decodedToken.exp;
    const currentTimeInSeconds: number = Math.floor(Date.now() / 1000);

    console.log(expirationTimeInSeconds)
    console.log(currentTimeInSeconds)

    if (currentTimeInSeconds > expirationTimeInSeconds) {
      this.logout();
      this.router.navigateByUrl('login');
    }
  }
}

public changeType(type: string) {
  if(this.clientType != type){
    this.clientType = type
    console.log(this.clientType)
  }
}

public logout(): boolean {
  if (sessionStorage.getItem('token')) {
    sessionStorage.removeItem('token');
    this.clientType = 'Guest'
    return true;
  }
  return false;
}

public isAuth(): Observable<boolean> {
  let token = sessionStorage.getItem('token');
  if (token) {
      return of(true);
  }
  this.router.navigateByUrl('login');
  return of(false);
}

public isLoggedIn(): Observable<boolean>{
  if (sessionStorage.getItem('token')) {
    this.router.navigateByUrl('home-stay-list');
    return of(false);
  }
  return of(true);
}
public userIsLoggedIn(): Observable<boolean> {
  if(sessionStorage.getItem('token')) return of(true);
  return of(false);
}

public isAdmin(): Observable<boolean>{
  const token = sessionStorage.getItem('token');
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const userType: string = decodedToken.userType;
    if (userType == 'Administrador'){
      return of(true)
    }
  }
  this.router.navigateByUrl('home-stay-list');
  return of(false);
}

public isHost(): Observable<boolean>{
  if (this.clientType == 'Host') {
    return of(true);
  }
  this.router.navigateByUrl('home-stay-list');
  return of(false);
}

}
