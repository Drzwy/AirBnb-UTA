import { Component } from '@angular/core';
import {ChangeOptionDTO, UserGlobalPreferencesService} from "../../services/user-global-preferences.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.bootstrap.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private _isLoggedIn: boolean = true;
  private configVisibility: boolean = false;


  constructor(
    private service: UserGlobalPreferencesService,
    private router: Router
  ) {}

  public navigateByURL(id: string ): void {
    this.router.navigate([id]);
  }
  readonly largeButton: UrlOption = {
    label: "Pon tu espacio en Airbnb",
    url: 'add-home-stay'
  }
  readonly userConfigOptions: UrlOption[] = [
    {
      label: "Mensajes",
      url: ''
    },
    {
      label: "Notificaciones",
      url: ''
    },
    {
      label: "Pon tu espacio en Airbnb",
      url: 'add-home-stay'
    },
    {
      label: "Cuenta",
      url: ''
    }
  ]


  readonly userInfo: UserDto = {
    username : "tomascaca"
  }




  public isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
  public isVisible(): boolean {
    return this.configVisibility;
  }
  public toggleVisibility() {
    this.configVisibility = !this.configVisibility;
  }

  public getFirstChar(): string | undefined {
    if( this.userInfo.username == "" || !this._isLoggedIn) return undefined;
    return this.userInfo.username.charAt(0).toUpperCase();
  }

  public getAllLanguages(): ChangeOptionDTO[] {
    return this.service.getAllLanguages();
  }



}

export interface UserDto {
  username: string
}

interface UrlOption {
  label: string,
  url: string
}
