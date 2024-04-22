import { Component } from '@angular/core';
import {ImageDTO} from "../housing-visualizer/images-card/image-card.component";
import {HomeDisplayService} from "../../services/home-display.service";

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent {
  constructor(private service: HomeDisplayService) {}

  private _test = {
    imageUrl: {
      url: "https://a0.muscache.com/im/pictures/f8a49f5f-51a5-406f-a93f-83ea84032640.jpg?im_w=320",
      alt: "sss",
      width: 270,
      height:270
    },
    location: "Laguna Verde, Chile",
    meanRating: "5 estrellas",
    availableDate: "5 - 10 de Mayo",
    pricePerNight: {
      price: 10000,
      typeChange: "CLP"
    },

  }
  readonly CONSTANTS = {
    perNightText: "noche"
  }

  public currentHomeStayList: HomeStayInformation[] = [
      this._test,
  ]

  public getPriceOf(home: HomeStayInformation): String {
    return this.service.intToMoneyFormat(
        home.pricePerNight.price,
        home.pricePerNight.typeChange
    )
  }




}

export interface HomeStayInformation {
  imageUrl: ImageDTO
  location: String
  meanRating: String
  availableDate: String
  pricePerNight: PricePerNight
}

interface PricePerNight {
  price: number,
  typeChange?: String
}