import { Component } from '@angular/core';
import {
  alternativeImageAlt,
  alternativeImageUrl,
} from '../../../../common/common';

@Component({
  selector: 'app-edit-home-stay',
  templateUrl: './edit-home-stay.component.html',
  styleUrl: './edit-home-stay.component.css',
})
export class EditHomeStayComponent {
  protected readonly alternativeImageUrl = alternativeImageUrl;
  protected readonly alternativeImageAlt = alternativeImageAlt;
}
