import {Component, OnDestroy, OnInit} from '@angular/core';
import {alternativeImageAlt, alternativeImageUrl, HomeStayConstants} from "../../../../common/common";
import {HomestayApiService, HomeStayGetResponse} from "../../services/homestay-api.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-edit-home-stay',
  templateUrl: './edit-home-stay.component.html',
  styleUrl: './edit-home-stay.component.css'
})
export class EditHomeStayComponent implements OnInit, OnDestroy {
  public userHomeStays: HomeStayGetResponse[] = [];
  private _subscription?: Subscription

  constructor(
    private httpService: HomestayApiService
  ) {

  }

  ngOnInit(): void {
    this._subscription = this.httpService.getHomeStayOf(1).subscribe(
      value => this.userHomeStays = value
    )
  }
  ngOnDestroy() {
    this._subscription?.unsubscribe()
  }

  public sendDeleteHomeStay(homeStay: HomeStayGetResponse) {
    this.httpService.deleteHomeStay(homeStay.id).subscribe(
      value => {}
    )
  }

  protected readonly alternativeImageUrl = alternativeImageUrl;
  protected readonly alternativeImageAlt = alternativeImageAlt;
  protected readonly HomeStayConstants = HomeStayConstants;
}
