import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-images-card',
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.css',
})
export class ImageCardComponent {
  @Input() imageUrls: string[] = [];

  public getImages(): string[] {
    return this.imageUrls;
  }
}

export interface ImageDTO {
  url: String;
  alt: String;
  width?: number;
  height?: number;
}
