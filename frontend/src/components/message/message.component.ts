import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  MessageApiService,
  MessageResponse,
} from '../../services/message-api.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
})
export class MessageComponent implements OnInit, OnDestroy {
  @Input() public id: number = 0;
  private _sub = new Subscription();
  private _currentMessages: MessageResponse[] = [];
  ngOnInit() {
    if (this.id !== 0) {
      this._sub = this.msgService
        .getMessagesOfId(this.id)
        .subscribe((value: MessageResponse[]) => {
          this._currentMessages = value;
        });
    }
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }

  constructor(private msgService: MessageApiService) {}

  public getCurrentHostMessages(): MessageResponse[] {
    console.log(this._currentMessages.length)
    return this._currentMessages;
  }
}
