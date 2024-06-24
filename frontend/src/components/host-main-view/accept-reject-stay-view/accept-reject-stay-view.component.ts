import { Component, OnDestroy, OnInit } from '@angular/core';
import { StayResponse, StaysService } from '../../../services/stays.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accept-reject-stay-view',
  templateUrl: './accept-reject-stay-view.component.html',
  styleUrl: './accept-reject-stay-view.component.css',
})
export class AcceptRejectStayViewComponent implements OnInit, OnDestroy {
  private _stayRequests: StayResponse[] = [];
  private _subscription = new Subscription();

  constructor(private service: StaysService) {}

  ngOnInit() {
    this._subscription = this.service.getStayRequests().subscribe((value) => {
      this._stayRequests = value;
    });
  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  public getCurrentStayRequests(): StayResponse[] {
    return this._stayRequests;
  }
}
