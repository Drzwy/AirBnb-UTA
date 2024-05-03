import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  readonly configOptionsButton = {
    optionsLabels : [
      "Mensajes",
      "Notificaciones",
      "Viajes",
      "Pon tu espacio en Airbnb",
      "Cuenta"
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



}

export interface UserDto {
  username: string
}
