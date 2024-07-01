import { Component, OnInit } from '@angular/core';
import {
  HomeDisplayService,
  HomeStayType,
} from '../../../services/home-display.service';

@Component({
  selector: 'app-home-type-buttons',
  templateUrl: './home-type-buttons.component.html',
  styleUrl: './home-type-buttons.component.css',
})
export class HomeTypeButtonsComponent implements OnInit {
  public homeStayTypes: HomeStayType[] = [];

  constructor(private service: HomeDisplayService) {
    this.homeStayTypes = service.getHomeStayTypes();
  }
  ngOnInit() {
  }

  public changeHomeStayType(type: string) {
    this.service.filterHomestays(`tipo=${type}`);
  }
  public getVectorImageSize() {
    return this.service.HOUSE_TYPE_VECTOR_SIZE;
  }
}
