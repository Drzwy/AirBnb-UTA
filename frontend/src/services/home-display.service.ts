import { Injectable } from '@angular/core';
import {ImageDTO} from "../components/housing-visualizer/images-card/image-card.component";

@Injectable({
  providedIn: 'root'
})
export class HomeDisplayService {
  readonly HOUSETYPEVECTORSIZE: number = 40
  constructor() { }

  public getHomeStayTypes(): HomeStayType[] {
    return [
        { type: "Cabaña",
          vectorImage:{
            url: "https://static.vecteezy.com/system/resources/previews/000/366/438/original/home-vector-icon.jpg",
            alt: "",
            height: 20,
            width: 20
          }
        },
        { type: "Casa Chica",
          vectorImage:{
          url: "https://static.vecteezy.com/system/resources/previews/000/366/438/original/home-vector-icon.jpg",
          alt: "",
          height: 20,
          width: 20}
        },
        { type: "Casa Grande",
          vectorImage:{
            url: "https://static.vecteezy.com/system/resources/previews/000/366/438/original/home-vector-icon.jpg",
            alt: "",
            height: 20,
            width: 20}
        },
        { type: "Ruca",
          vectorImage:{
            url: "https://static.vecteezy.com/system/resources/previews/000/366/438/original/home-vector-icon.jpg",
            alt: "",
            height: 20,
            width: 20
          }
        },
    ]
  }

  public intToMoneyFormat(mount: number, changeType?: String): String {
    let toCharArray = mount.toString().split("")
    let stack: String[] = []
    let count = 0
    for (let i = toCharArray.length-1; i >= 0; i--) {
      stack.push(toCharArray[i])
      count++
      if (count % 3 == 0) {
        stack.push(",")
      }
    }

    let output = ""
    while (stack.length != 0) {
      output+=stack.pop()
    }


    return "$"+output+" "+changeType
  }
}

export interface HomeStayType {
  type: String,
  vectorImage: ImageDTO
}
