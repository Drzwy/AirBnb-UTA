import {Component, OnInit} from '@angular/core';
import {ImageDTO} from "../housing-visualizer/images-card/image-card.component";
import {emptyFilter, HomeDisplayService, HomeStayType} from "../../services/home-display.service";
import {FilterState} from "./advanced-filter/advanced-filter.component";

@Component({
  selector: 'app-home-stay-list',
  templateUrl: './home-stay-list.component.html',
  styleUrl: './home-stay-list.component.css'
})
export class HomeStayListComponent implements OnInit {
  public currentType: string = ""
  public currentFilter: FilterState = emptyFilter
  public currentHomeStayList: HomeStayInformation[] = []


  constructor(private service: HomeDisplayService) {
  }
  ngOnInit() {
    this.service.currentType.subscribe(
        value => {
          this.currentHomeStayList = this.updateHomeStayList(value)
        }
    )
    this.service.currentFilterState.subscribe(
      value =>
        this.currentFilter = value
    )
    this.service.filterHomeStaysByConditions().subscribe(
      value =>
        this.currentHomeStayList = value
    )
  }


  readonly CONSTANTS = {
    perNightText: "noche"
  }
  readonly homeStayTypes: HomeStayType[] = this.service.getHomeStayTypes()
  readonly IMAGE_DIMENSIONS: number  = 270

  public updateHomeStayList(type?: string, filter?: FilterState): HomeStayInformation[] {
    if (type === undefined || type == "") {
      return this.service.availableHomeStays
    }
    return this.service.availableHomeStays.filter(
        homeStay =>
          homeStay.homeStayType == type && homeStay.pricePerNight

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
