import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ChangeOptionDTO,
  UserGlobalPreferencesService,
  UserMeResponse,
} from '../../services/user-global-preferences.service';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../services/login-register.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.bootstrap.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit, OnDestroy {
  private _isLoggedIn: boolean = true;
  private _currentUser: UserMeResponse = {
    id: 0,
    nombre: '',
    anfitrionDe: [],
    apellidoPat: '',
  };
  private configVisibility: boolean = false;
  private loginSub?: Subscription;
  private userSub?: Subscription;

  constructor(
    private service: UserGlobalPreferencesService,
    private loginService: LoginRegisterService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loginSub = this.loginService.userIsLoggedIn().subscribe((value) => {
      this._isLoggedIn = value;
    });
    this.userSub = this.service
      .getCurrentUser()
      .subscribe((value: UserMeResponse) => {
        this._currentUser = value;
      });
  }

  ngOnDestroy(): void {
    this.loginSub!.unsubscribe();
    this.userSub!.unsubscribe();
  }

  public getCurrentUserInfo() {
    console.log(sessionStorage.getItem('token'));
    this.service.getCurrentUser().subscribe((val) => {
      alert(val.id); //TODO SEGUIR DESDE ACA
    });
  }

  public navigateByURL(id: string): void {
    if (id == 'logout') {
      this.loginService.logout();
      this.router.navigate([this.router.url]).then(() => {
        window.location.reload();
      });
    } else if (id == 'home-stay-list') {
      this.router.navigate([id]).then(() => {
        window.location.reload();
      });
    } else {
      this.router.navigate([id]);
    }
  }
  readonly largeButtonHasHomestays: UrlOption = {
    label: 'Pon tu espacio en Airbnb',
    url: 'add-home-stay',
  };
  readonly largeButtonHostMode: UrlOption = {
    label: 'Modo Anfitrión',
    url: 'about-me-host',
  };
  readonly userConfigOptions: UrlOption[] = [
    {
      label: 'Mensajes',
      url: '',
    },
    {
      label: 'Modo Anfitrión',
      url: 'about-me-host',
    },
    {
      label: 'Pon tu espacio en Airbnb',
      url: 'add-home-stay',
    },
    {
      label: 'Cuenta',
      url: 'about-me',
    },
    {
      label: 'Cerrar Sesión',
      url: 'logout',
    },
  ];
  readonly noUserOptions: UrlOption[] = [
    { label: 'Inicia Sesión', url: 'login' },
    { label: 'Regístrate', url: 'register' },
    { label: 'Pon tu espacio en Airbnb', url: 'add-home-stay' },
  ];
  readonly userInfo: UserDto = {
    username: 'tomascaca',
  };

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
    if (this._currentUser.nombre == '' || !this._isLoggedIn) return undefined;
    return this._currentUser.nombre.charAt(0).toUpperCase();
  }

  public getAllLanguages(): ChangeOptionDTO[] {
    return this.service.getAllLanguages();
  }

  public currentUserHasHomestays(): boolean {
    return this._currentUser.anfitrionDe.length > 0;
  }
}

export interface UserDto {
  username: string;
}

interface UrlOption {
  label: string;
  url: string;
}
