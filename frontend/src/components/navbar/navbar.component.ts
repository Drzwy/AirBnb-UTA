import { Component } from '@angular/core';
import {ChangeOptionDTO, UserGlobalPreferencesService} from "../../services/user-global-preferences.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.bootstrap.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  constructor(private service: UserGlobalPreferencesService) {

  }


  readonly configOptionsButton = {
    optionsLabels : [
      "Mensajes",
      "Notificaciones",
      "Viajes",
      "Pon tu espacio en Airbnb",
      "Cuenta"
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
  private configVisibility: boolean = false

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



}

export interface UserDto {
  username: string
}
