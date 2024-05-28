import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChangeOptionDTO, UserGlobalPreferencesService} from "../../services/user-global-preferences.service";
import {Router} from "@angular/router";
import {LoginRegisterService} from "../../services/login-register.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.bootstrap.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit , OnDestroy{
  private _isLoggedIn: boolean = true;
  private configVisibility: boolean = false;
  private loginSub?: Subscription;



  constructor(
    private service: UserGlobalPreferencesService,
    private loginService: LoginRegisterService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginSub = this.loginService.userIsLoggedIn().subscribe(
      value => {
        this._isLoggedIn = value;
      }
    )
  }

  ngOnDestroy(): void {
    this.loginSub!.unsubscribe();
  }




  public navigateByURL(id: string ): void {
    if (id == "logout") {
      this.loginService.logout()
    }
    else {
      this.router.navigate([id]);

    }

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
    },
    {
      label: "Cerrar Sesión",
      url: 'logout'
    }
  ]
  readonly noUserOptions: UrlOption[] = [
    {label: "Inicia Sesión", url: "login"},
    {label: "Regístrate", url: "register"},
    {label: "Pon tu espacio en Airbnb", url: "add-home-stay"},

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
