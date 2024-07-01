import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserGlobalPreferencesService } from '../../services/user-global-preferences.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrl: './account-view.component.css',
})
export class AccountViewComponent implements OnInit, OnDestroy {
  public _id: number = 0;
  private _userSubscription: Subscription = new Subscription();
  constructor(private userService: UserGlobalPreferencesService) {}

  ngOnInit() {
    this._userSubscription = this.userService
      .getCurrentUser()
      .subscribe((value) => {
        this._id = value.id;
      });
  }
  ngOnDestroy() {
    this._userSubscription.unsubscribe();
  }

  public getUserId(): number {
    return this._id;
  }
}
