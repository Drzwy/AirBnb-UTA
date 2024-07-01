import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UserGlobalPreferencesService,
  ValoracionUsuarioResponse,
} from '../../services/user-global-preferences.service';
import { HomeStayGetResponse } from '../../services/homestay-api.service';
import { Subscription } from 'rxjs';
import {
  alternativeImageAlt,
  alternativeImageUrl,
  HomeStayConstants,
} from '../../common/common';
import { StaysService } from '../../services/stays.service';
import { Router } from '@angular/router';
import { HomeDisplayService } from '../../services/home-display.service';

@Component({
  selector: 'app-host-main-view',
  templateUrl: './host-main-view.component.html',
  styleUrl: './host-main-view.component.css',
})
export class HostMainViewComponent implements OnInit, OnDestroy {
  private _currentHostHouses: HomeStayGetResponse[] = [];
  private _currentHostRatings: ValoracionUsuarioResponse[] = [];
  private _currentHostProfit: number = 0;
  private _currentHostName: string = '';
  private _currentHostLastname: string = '';
  private _currentHostId: number = 0;
  private _userSubscription: Subscription = new Subscription();
  private _staySubscription: Subscription = new Subscription();

  constructor(
    private userService: UserGlobalPreferencesService,
    private stayService: StaysService,
    private router: Router
  ) {}

  ngOnInit() {
    this._userSubscription = this.userService
      .getCurrentUser()
      .subscribe((value) => {
        this._currentHostHouses = value.anfitrionDe;
        this._currentHostName = value.nombre;
        this._currentHostLastname = value.apellidoPat;
        this._currentHostId = value.id;
        if (value.valoracionesRecibidas) {
          this._currentHostRatings = value.valoracionesRecibidas;
        }
      });
    this._staySubscription = this.stayService
      .getStayRequestOfLoggedHost()
      .subscribe((value) => {
        value.forEach((staysOfHost) => {
          staysOfHost.hospedajes.forEach((stay) => {
            if (stay.hospedaje.estadoAceptacion === 'ACEPTADO') {
              this._currentHostProfit += stay.hospedaje.costoHospedaje;
            }
          });
        });
      });
  }

  ngOnDestroy() {
    this._userSubscription.unsubscribe();
    this._staySubscription.unsubscribe();
  }


  public homeVisualizer(id: number) {
    this.router.navigate([`housing-visualizer/${id}`]);
  }
  public getCurrentHostHouses(): HomeStayGetResponse[] {
    return this._currentHostHouses;
  }
  public getCurrentHostName(): string {
    return this._currentHostName;
  }
  public getCurrentHostLastName(): string {
    return this._currentHostLastname;
  }
  public getCurrentHostId(): number {
    return this._currentHostId;
  }

  public getMoneyOfAcceptedStays(): number {
    return this._currentHostProfit;
  }

  public getRatingOfCurrentHost(): number {
    if (!this._currentHostRatings) return 0;
    let rating: number = 0;
    this._currentHostRatings.map((r: ValoracionUsuarioResponse) => {
      rating += r.puntuacion;
    });

    return (
      rating / (this._currentHostRatings ? this._currentHostRatings.length : 1)
    );
  }

  protected readonly alternativeImageUrl = alternativeImageUrl;
  protected readonly HomeStayConstants = HomeStayConstants;
  protected readonly alternativeImageAlt = alternativeImageAlt;
}
