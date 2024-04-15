import {Component, Input} from '@angular/core';



@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent {
  private isImage: Boolean = true
  @Input() image: String = ""



  public getIsImage(): Boolean {
    return this.isImage
  }



}



