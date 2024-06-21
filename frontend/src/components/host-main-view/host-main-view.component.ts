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
} from '../../../../common/common';
import {
  MessageApiService,
  MessageResponse,
} from '../../services/message-api.service';

@Component({
  selector: 'app-host-main-view',
  templateUrl: './host-main-view.component.html',
  styleUrl: './host-main-view.component.css',
})
export class HostMainViewComponent implements OnInit, OnDestroy {
  private _currentHostHouses: HomeStayGetResponse[] = [];
  private _currentHostRatings: ValoracionUsuarioResponse[] = [];
  private _currentHostName: string = '';
  private _currentHostId: number = 0;
  private _userSubscription = new Subscription();
  constructor(private userService: UserGlobalPreferencesService) {}

  ngOnInit() {
    this._userSubscription = this.userService
      .getCurrentUser()
      .subscribe((value) => {
        this._currentHostHouses = value.anfitrionDe;
        this._currentHostName = value.nombre;
        this._currentHostId = value.id;
        if (value.valoracionesRecibidas) {
          this._currentHostRatings = value.valoracionesRecibidas;
        }
      });
  }

  ngOnDestroy() {
    this._userSubscription.unsubscribe();
  }

  public getCurrentHostHouses(): HomeStayGetResponse[] {
    return this._currentHostHouses;
  }
  public getCurrentHostName(): string {
    return this._currentHostName;
  }
  public getCurrentHostId(): number {
    return this._currentHostId;
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
