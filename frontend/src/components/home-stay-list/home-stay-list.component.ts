import {Component, Input, OnInit} from '@angular/core';
import {ImageDTO} from "../housing-visualizer/images-card/image-card.component";
import {HomeDisplayService, HomeStayType} from "../../services/home-display.service";

@Component({
  selector: 'app-home-stay-list',
  templateUrl: './home-stay-list.component.html',
  styleUrl: './home-stay-list.component.css'
})
export class HomeStayListComponent implements OnInit {
  public currentType: string = ""
  public currentHomeStayList: HomeStayInformation[] = []


  constructor(private service: HomeDisplayService) {

  }
  ngOnInit() {
    this.service.currentType.subscribe(
        value => {
          this.currentHomeStayList = this.updateHomeStayList(value)
        }
    )
  }


  readonly CONSTANTS = {
    perNightText: "noche"
  }
  readonly homeStayTypes: HomeStayType[] = this.service.getHomeStayTypes()
  readonly IMAGE_DIMENSIONS: number  = 270

  public updateHomeStayList(type: string): HomeStayInformation[] {
    if (type === undefined || type == "") {
      return this.service.availableHomeStays
    }
    return this.service.availableHomeStays.filter(
        homeStay => homeStay.homeStayType == type
    )
  }


  public getPriceOf(home: HomeStayInformation): String {
    return this.service.intToMoneyFormat(
        home.pricePerNight.price,
        home.pricePerNight.typeChange
    )
  }






}

export interface HomeStayInformation {
  homeStayType: string
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