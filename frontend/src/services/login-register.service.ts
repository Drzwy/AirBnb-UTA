import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { userRegister } from '../components/register/register.component';
import { Observable, of } from 'rxjs';
import { userLogin } from '../components/login/login.component';
import { jwtDecode } from "jwt-decode"; //la idea es hacer todo con jwt pero no tengo los token del backend pipipi

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

constructor(
  private router: Router
  
) {this.checkTokenExpiration(); }

private users: userRegister[] = [
  {email: "a@a.com", password: "12345A", run: "12345678-9", name: "Ibar", lastName:"Ramiro", moLastName:"Varotes", userType: "Client"},
  {email: "b@b.com", password: "12345A", run: "22345678-9", name: "Ibarinho", lastName:"Ramirinho", moLastName:"Garotinho", userType: "Admin"}
]



public register(userRegistered: userRegister): Observable<boolean>{
  let isAlreadyRegistered = this.users.find(user => user.email === userRegistered.email || user.run === userRegistered.run);

  if(!!!isAlreadyRegistered){
    userRegistered.clientType = "Guest"
    this.users.push(userRegistered);  
    console.log(this.users);
  }

  return of(!!!isAlreadyRegistered); 
}

public login(user2: userLogin): Observable<boolean> {
  let isAuthenticate = this.users.find(user => user.email === user2.email && user.password === user2.password);

  if (isAuthenticate) {
    isAuthenticate.clientType = "Guest"

    // Obtener la fecha actual y la fecha de expiración en formato UNIX (segundos)
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    const expirationTimeInSeconds = currentTimeInSeconds + 600;

    //este token deberia cambiar por el de backend
    const token: string = btoa(`${user2.email};${user2.password};${isAuthenticate.userType};${expirationTimeInSeconds}`);
    sessionStorage.setItem('token', token);
    console.log(this.users)
  }

  return of(!!isAuthenticate);
}

private checkTokenExpiration() {
  let token = sessionStorage.getItem('token');
  if (token) {
    // Decodificar el token para obtener la hora de expiración
    let expirationTimeInSeconds = atob(token).split(';')[3];
    let expirationTime = parseInt(expirationTimeInSeconds, 10);
    console.log(expirationTime)
    // Obtener la hora actual en segundos
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    console.log(currentTimeInSeconds)
    // Verificar si la hora de expiración ha pasado
    if (currentTimeInSeconds > expirationTime) {
      // Si ha pasado, eliminar el token y redirigir al login
      this.logout()
      this.router.navigateByUrl('login');
    }
  }
}

// la voy a reemplazar despues por la getDecodeToken
private getData(i: number) {
  let token = sessionStorage.getItem('token');
  if (token){
      token = atob(token)
      let tokenA = token.split(';')
      token = tokenA[i]
      return token
  }
  return 'null'
}

public changeType(type: string) {
  if (sessionStorage.getItem('token')) {
    let email = this.getData(0)
    let password = this.getData(1)
    let index = this.users.findIndex(user => user.email === email && user.password === password);
    if(index != -1){
      this.users[index].clientType = type
    }
  }
  console.log(this.users)
}

public logout(): boolean {
  if (sessionStorage.getItem('token')) {
    sessionStorage.removeItem('token');
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

public isAdmin(): Observable<boolean>{
  debugger;
  if (sessionStorage.getItem('token')) {
    let type = this.getData(2)
    if (type == 'Admin'){
      return of(true)
    }
  }
  this.router.navigateByUrl('home-stay-list');
  return of(false);
}

// para que solo el host pueda entrar en las funciones de host
public isHost(): Observable<boolean>{
  debugger;
  if (sessionStorage.getItem('token')) {
      let email = this.getData(0)
      let password = this.getData(1)
      let user = this.users.find(user => user.email === email && user.password === password);
      if(user && user.clientType == "Host"){
          return of(true);
      }       
  } 
  this.router.navigateByUrl('home-stay-list');
  return of(false);
} 

// jwt
// private getDecodeToken(token: string){
//   const decoded = jwtDecode(token);
//   return decoded;
// }

}
