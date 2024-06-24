import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { StayResponse, StaysService } from '../../services/stays.service';
import { Subscription } from 'rxjs';
import {
  HomestayApiService,
  HomeStayGetResponse,
} from '../../services/homestay-api.service';

@Component({
  selector: 'app-stay-requests',
  templateUrl: './stay-requests.component.html',
  styleUrl: './stay-requests.component.css',
})
export class StayRequestsComponent implements OnDestroy, OnChanges {
  @Input({ required: true }) public id?: number;
  private _stayRequests: StayResponse[] = [];
  private _subscription = new Subscription();
  constructor(
    private service: StaysService,
    private homeService: HomestayApiService,
  ) {}
  /*
  ngOnInit() {
    this._subscription = this.service
      .getStayRequestsOf(this.id ? this.id : 0)
      .subscribe((value) => (this._stayRequests = value));
  }
 */
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.id = changes['id'].currentValue;
    this._subscription = this.service
      .getStayRequestsOf(this.id ? this.id : 0)
      .subscribe((value) => (this._stayRequests = value));
  }

  public getStayRequests(): StayResponse[] {
    return this._stayRequests;
  }
}
