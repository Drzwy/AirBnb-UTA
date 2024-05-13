import { Injectable } from '@angular/core';
import {ImageDTO} from "../components/housing-visualizer/images-card/image-card.component";
import {HomeStayInformation} from "../components/home-stay-list/home-stay-list.component";
import {BehaviorSubject} from "rxjs";
import {FilterState} from "../components/home-stay-list/advanced-filter/advanced-filter.component";

const _test = {
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
  homeStayType: "Ruca"
}
const _test2 = {
  imageUrl: {
    url: "https://a0.muscache.com/im/pictures/f8a49f5f-51a5-406f-a93f-83ea84032640.jpg?im_w=320",
    alt: "sss",
    width: 270,
    height:270
  },
  location: "Lago Llanquihue",
  meanRating: "4 estrellas",
  availableDate: "10 - 12 de Mayo",
  pricePerNight: {
    price: 20000,
    typeChange: "CLP"
  },
  homeStayType: "Casa Chica"
}
const _test3 = {
  imageUrl: {
    url: "https://a0.muscache.com/im/pictures/f8a49f5f-51a5-406f-a93f-83ea84032640.jpg?im_w=320",
    alt: "sss",
    width: 270,
    height:270
  },
  location: "Frutillar",
  meanRating: "5 estrellas",
  availableDate: "5 - 10 de Mayo",
  pricePerNight: {
    price: 1000000,
    typeChange: "USD"
  },
  homeStayType: "Casa Grande"
}

export const emptyFilter: FilterState = {
  numberOfGuests : 0,
  numberOfRooms : 0,
  numberOfBathrooms : 0,
  minPricePerNight : 0,
  maxPricePerNight : 0
}


@Injectable({
  providedIn: 'root'
})
export class HomeDisplayService {
  readonly HOUSE_TYPE_VECTOR_SIZE: number = 30
  readonly availableHomeStays: HomeStayInformation[] = [_test,_test2,_test3]


  //observable type
  public currentType: BehaviorSubject<string> = new BehaviorSubject<string>("")

  //observable filter validation
  public filterIsValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  )
  private _currentFilterState: FilterState = emptyFilter

  //observable filter
  public currentFilterState: BehaviorSubject<FilterState> = new BehaviorSubject<FilterState>(
    this._currentFilterState
  )


  /*
  * TODO llamar al backend para recibir el filtrado de casas disponibles
  * */
  public filterHomeStaysByConditions(type?: string, filter?: FilterState): BehaviorSubject<HomeStayInformation[]> {
    this.availableHomeStays.forEach(
      homeStay => {

      }
    )
    return new BehaviorSubject<HomeStayInformation[]>( this.availableHomeStays )
  }


  /*
  public currentPricePerNightRange: number[min,max]
  public currentNumberOfRooms: number
  public currentNumberOfGuests: number
  public currentNumberOfBathrooms: number
  public currentServicesAvailable: String[]
  * */

  public changeCurrentType(type: string) {
    this.currentType.next(type)
  }

  public changeCurrentFilterState(state: FilterState): void {
    this._currentFilterState = state
    this.validateCurrentFilterState()

  }



  private validateCurrentFilterState(): void {
    if (
      this._currentFilterState.numberOfGuests <= 0 ||
      this._currentFilterState.numberOfRooms <= 0  ||
      this._currentFilterState.numberOfBathrooms <= 0 ||
      this._currentFilterState.maxPricePerNight < this._currentFilterState.minPricePerNight
    ){
      this.filterIsValid.next(false)
    }
    else {
      this.filterIsValid.next(true)
    }
  }
  /*
  * Va a cambiar cuando se pueda llamar a la BBDD y obtener los tipos disponibles
  * */
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
      { type: "Apartamento Pequeño",
        vectorImage:{
          url: "https://static.vecteezy.com/system/resources/previews/000/366/438/original/home-vector-icon.jpg",
          alt: "",
          height: 20,
          width: 20
        }
      }
    ]
  }

  /**
   * Formatea el precio de entero a formato plata
   */

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


/*
* Cada tipo de arriendo tiene un nombre y un icono/imagen predeterminado
* Debe almacenarse en la BBDD, de lo contrario, crear un archivo assets
* */
export interface HomeStayType {
  type: string,
  vectorImage: ImageDTO
}
