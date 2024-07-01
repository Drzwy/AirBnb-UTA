import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  StayOfHost,
  StayPost,
  StayResponse,
  StaysService,
} from '../../../services/stays.service';
import { Subscription, take } from 'rxjs';
import { UserMeResponse } from '../../../services/user-global-preferences.service';

@Component({
  selector: 'app-accept-reject-stay-view',
  templateUrl: './accept-reject-stay-view.component.html',
  styleUrl: './accept-reject-stay-view.component.css',
})
export class AcceptRejectStayViewComponent implements OnInit, OnDestroy {
  public _stayRequests: StayOfHost[] = [];
  private _subscription = new Subscription();

  constructor(private service: StaysService) {}

  ngOnInit() {
    this._subscription = this.service
      .getStayRequestOfLoggedHost()
      .subscribe((value) => {
        this._stayRequests = value;
      });
  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  public acceptStay(stay: StayResponse) {
    this.service
      .acceptStayRequest(this.getIdsOfStay(stay))
      .pipe(take(1))
      .subscribe((value) => {
        if (value) {
          alert('SE HA ACEPTADO LA SOLICITUD!!');
        } else {
          alert('ALGO MALO HA OCURRIDO');
        }
      });
    window.location.reload();
  }

  public rejectStay(stay: StayResponse) {
    this.service
      .rejectStayRequest(this.getIdsOfStay(stay))
      .pipe(take(1))
      .subscribe((value) => {
        if (value) {
          alert('SE HA RECHAZADO LA SOLICITUD.');
        } else {
          alert('ALGO MALO HA OCURRIDO');
        }
      });
      window.location.reload();
  }

  private getIdsOfStay(stay: StayResponse): StayPost {
    return {
      id: stay.id,
      huespedId: stay.huespedId,
      propiedadId: stay.propiedadId,
    };
  }
}
