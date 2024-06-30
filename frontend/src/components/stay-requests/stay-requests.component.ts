import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { StayResponse, StaysService } from '../../services/stays.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stay-requests',
  templateUrl: './stay-requests.component.html',
  styleUrl: './stay-requests.component.css',
})
export class StayRequestsComponent implements OnDestroy, OnChanges {
  @Input({ required: true }) public id?: number;
  private _stayRequests: StayResponse[] = [];
  private _staysArraySubscription: Subscription = new Subscription();
  constructor(private service: StaysService) {}

  ngOnDestroy() {
    this._staysArraySubscription.unsubscribe();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.id = changes['id'].currentValue;
    this._staysArraySubscription = this.service
      .getStayRequestsMadeByLoggedGuest()
      .subscribe((value) => (this._stayRequests = value));
  }

  public getStayRequests(): StayResponse[] {
    return this._stayRequests;
  }
}
