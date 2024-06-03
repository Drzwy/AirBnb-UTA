import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  alternativeImageAlt,
  alternativeImageUrl,
  HomeStayConstants,
} from '../../../../common/common';
import {
  HomestayApiService,
  HomeStayGetResponse,
} from '../../services/homestay-api.service';
import { Subscription } from 'rxjs';
import {
  UserGlobalPreferencesService,
  UserMeResponse,
} from '../../services/user-global-preferences.service';

@Component({
  selector: 'app-edit-home-stay',
  templateUrl: './edit-home-stay.component.html',
  styleUrl: './edit-home-stay.component.css',
})
export class EditHomeStayComponent implements OnInit, OnDestroy {
  private _subscription?: Subscription;
  private currentUser?: UserMeResponse;
  private homeStaysOfUser?: HomeStayGetResponse[];
  private _userSubscription = new Subscription();

  constructor(
    private httpService: HomestayApiService,
    private userService: UserGlobalPreferencesService,
  ) {}

  ngOnInit(): void {
    this._userSubscription = this.userService
      .getCurrentUser()
      .subscribe((value) => {
        this.currentUser = value;
        this.homeStaysOfUser = value.anfitrionDe;
      });
  }
  ngOnDestroy() {
    this._subscription?.unsubscribe();
    this._userSubscription.unsubscribe();
  }
  public getHomeStaysOfCurrentUser(): HomeStayGetResponse[] {
    if (this.currentUser) {
      return this.currentUser.anfitrionDe;
    } else {
      return [];
    }
  }

  public sendDeleteHomeStay(homeStay: HomeStayGetResponse) {
    this.httpService.deleteHomeStay(homeStay.id).subscribe(() => {
      window.location.reload();
    });
  }
  public getHomeStaysOfUser() {
    return this.homeStaysOfUser;
  }

  protected readonly alternativeImageUrl = alternativeImageUrl;
  protected readonly alternativeImageAlt = alternativeImageAlt;
  protected readonly HomeStayConstants = HomeStayConstants;
  protected readonly window = window;
}
