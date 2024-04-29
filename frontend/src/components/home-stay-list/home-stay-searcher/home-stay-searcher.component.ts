import {Component, OnInit} from '@angular/core';
import {HomeDisplayService, HomeStayType} from "../../../services/home-display.service";


@Component({
  selector: 'app-home-stay-searcher',
  templateUrl: './home-stay-searcher.component.html',
  styleUrl: './home-stay-searcher.component.css'
})
export class HomeStaySearcherComponent implements OnInit {
  public homeStayTypes: HomeStayType[] = []
  public currentType: string = ""

  constructor(private service: HomeDisplayService) {
    this.homeStayTypes = service.getHomeStayTypes()

  }
  ngOnInit() {
    this.service.currentType.subscribe()
  }


  public changeHomeStayType(type: string) {
    this.service.changeCurrentType(type)
  }
  public getVectorImageSize() {
    return this.service.HOUSE_TYPE_VECTOR_SIZE
  }
}
