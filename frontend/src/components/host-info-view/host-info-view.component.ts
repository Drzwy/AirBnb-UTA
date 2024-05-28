import { Component } from '@angular/core';
import { HomeStayInformation } from '../home-stay-list/home-stay-list.component';
import { HomeDisplayService } from '../../services/home-display.service';

@Component({
  selector: 'app-host-info-view',
  templateUrl: './host-info-view.component.html',
  styleUrl: './host-info-view.component.css',
})
export class HostInfoViewComponent {
  readonly sampleHost: HostInfo = {
    name: 'Juan Yampara',
    languages: ['Español', 'Portugués'],
    livesIn: 'Chile',
    descriptionParagraphs: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    ],
    numberOfReviews: 384,
    meanRating: 4.65,
    yearsAsHost: 9,
  };
  readonly cardLabels: HostCardLabels[] = [
    {
      label: 'Reseñas',
      numberOf: this.sampleHost.numberOfReviews,
    },
    {
      label: 'Calificación',
      numberOf: this.sampleHost.meanRating,
    },
    {
      label: 'Años como anfitrión',
      numberOf: this.sampleHost.yearsAsHost,
    },
  ];
  readonly CONSTANTS = {
    aboutHostLabel: 'Acerca de ',
    languagesLabel: 'Habla ',
    andLabel: 'y ',
    livesInLabel: 'Vive en ',
    reviewsOfHostLabel: 'Reseñas de ',
    homestaysOfHostLabel: 'Anuncios de ',
  };

  constructor(private service: HomeDisplayService) {}

  public getHomeStaysOf(host: HostInfo) {
    return this.service.availableHomeStays;
  }

  protected readonly CompressionStream = CompressionStream;
}

interface HostInfo {
  name: string;
  languages: string[];
  livesIn: string;
  descriptionParagraphs: string[];
  numberOfReviews: number;
  meanRating: number;
  yearsAsHost: number;
}
interface HostCardLabels {
  label: string;
  numberOf: number;
}
