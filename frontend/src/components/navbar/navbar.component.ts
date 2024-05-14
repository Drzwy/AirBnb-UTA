import { Component } from '@angular/core';
import {ChangeOptionDTO, UserGlobalPreferencesService} from "../../services/user-global-preferences.service";
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../services/login-register.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.bootstrap.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private _isLoggedIn: boolean = false
  private configVisibility: boolean = false


  constructor(
    private service: UserGlobalPreferencesService,
    private router: Router,
    private loginRegisterService: LoginRegisterService
  ) {}


  readonly configOptionsButton = {
    loggedInOptionsLabels : [
      "Mensajes",
      "Notificaciones",
      "Viajes",
      "Pon tu espacio en Airbnb",
      "Cuenta"
    ],
    notLoggedInOptionLabels: [
      "Regístrate",
      "Inicia Sesión",
      "Pon tu espacio en Airbnb"
    ],
    optionsDisplayClass: [
      "",
      "",
      "",
      "",
      ""
    ]
  }
  readonly userInfo: UserDto = {
    username : "tomascaca"
  }

  public isLoggedIn(): boolean {
    return this._isLoggedIn
  }
  public isVisible(): boolean {
    return this.configVisibility
  }
  public toggleVisibility() {
    this.configVisibility = !this.configVisibility
  }

  public getFirstChar(): string {
    if( this.userInfo.username == "") return "U"
    return this.userInfo.username.charAt(0).toUpperCase()
  }

  public getAllLanguages(): ChangeOptionDTO[] {
    return this.service.getAllLanguages()
  }

  public logout(): void {
    if (this.loginRegisterService.logout()) {
      this.router.navigateByUrl('login');
    }
  }

  public changeType(type: string){
    this.loginRegisterService.changeType(type);
  }

}

export interface UserDto {
  username: string
}
