import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HomeStayForm} from "../components/add-home-stay/add-home-stay.component";
import {BehaviorSubject, Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class HomestayApiServiceService {

  constructor(private http: HttpClient) {

  }


}
