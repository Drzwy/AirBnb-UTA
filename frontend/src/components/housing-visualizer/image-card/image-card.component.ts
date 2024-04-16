import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.css'
})
export class ImageCardComponent {
    @Input() imageUrls: ImageDTO[] = [];

    public getImages(): ImageDTO[] {
      return this.imageUrls
    }

}

export interface ImageDTO {
  url: String,
  alt: String
}
