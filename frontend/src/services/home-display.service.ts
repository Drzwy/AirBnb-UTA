import { Injectable } from '@angular/core';
import { ImageDTO } from '../components/housing-visualizer/images-card/image-card.component';
import { HomeStayInformation } from '../components/home-stay-list/home-stay-list.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterState } from '../components/home-stay-list/advanced-filter/advanced-filter.component';
import { HttpClient } from '@angular/common/http';

const _test = {
  imageUrl: {
    url: 'https://a0.muscache.com/im/pictures/f8a49f5f-51a5-406f-a93f-83ea84032640.jpg?im_w=320',
    alt: 'sss',
    width: 270,
    height: 270,
  },
  location: 'Laguna Verde, Chile',
  meanRating: '5 estrellas',
  availableDate: '5 - 10 de Mayo',
  pricePerNight: {
    price: 10000,
    typeChange: 'CLP',
  },
  homeStayType: 'Ruca',
};
const _test2 = {
  imageUrl: {
    url: 'https://a0.muscache.com/im/pictures/f8a49f5f-51a5-406f-a93f-83ea84032640.jpg?im_w=320',
    alt: 'sss',
    width: 270,
    height: 270,
  },
  location: 'Lago Llanquihue',
  meanRating: '4 estrellas',
  availableDate: '10 - 12 de Mayo',
  pricePerNight: {
    price: 20000,
    typeChange: 'CLP',
  },
  homeStayType: 'Casa Chica',
};
const _test3 = {
  imageUrl: {
    url: 'https://a0.muscache.com/im/pictures/f8a49f5f-51a5-406f-a93f-83ea84032640.jpg?im_w=320',
    alt: 'sss',
    width: 270,
    height: 270,
  },
  location: 'Frutillar',
  meanRating: '5 estrellas',
  availableDate: '5 - 10 de Mayo',
  pricePerNight: {
    price: 1000000,
    typeChange: 'USD',
  },
  homeStayType: 'Casa Grande',
};

export const emptyFilter: FilterState = {
  numberOfGuests: 0,
  numberOfRooms: 0,
  numberOfBathrooms: 0,
  minPricePerNight: 0,
  maxPricePerNight: 0,
};

@Injectable({
  providedIn: 'root',
})
export class HomeDisplayService {
  private url: string = 'http://localhost:3000/homestays/get'

  constructor(private http: HttpClient){}

  readonly HOUSE_TYPE_VECTOR_SIZE: number = 30;
  public availableHomeStays: HomeStayInformation[] = []; //borre los ejemplos y esto hace que cambie para los demas metodos
  public images = [
    [{url:"https://a0.muscache.com/im/pictures/miso/Hosting-50788889/original/87249781-c250-463e-92e6-82391681da29.jpeg?im_w=1200", alt:"alt"},
      {url:"https://a0.muscache.com/im/pictures/miso/Hosting-50788889/original/896501f7-3435-4274-8e0f-d8a399cc0c9b.jpeg?im_w=1440", alt:"alt"},
      {url:"https://a0.muscache.com/im/pictures/miso/Hosting-50788889/original/38595f52-f747-42c4-9155-27e742a4bd21.jpeg?im_w=1440", alt:"alt"},
      {url:"https://a0.muscache.com/im/pictures/miso/Hosting-50788889/original/061e7561-3d88-4c47-b258-101c5b15fb84.jpeg?im_w=1440", alt:"alt"}
    ],
    [{url:"https://a0.muscache.com/im/pictures/miso/Hosting-913065006707124582/original/ccb1eda3-9de3-45aa-8055-527c4ad16a3f.jpeg?im_w=1440", alt:"alt"},
      {url:"https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTEzMDY1MDA2NzA3MTI0NTgy/original/f167b5db-8195-4146-baec-3ca579779dc5.jpeg?im_w=1440", alt:"alt"},
      {url:"https://a0.muscache.com/im/pictures/miso/Hosting-913065006707124582/original/1cedf0a3-91d3-43e8-9d4d-1eda76a28624.jpeg?im_w=1440", alt:"alt"},
      {url:"https://a0.muscache.com/im/pictures/miso/Hosting-913065006707124582/original/baf73e21-6282-4d68-bb94-5a5a88d455cd.jpeg?im_w=1440", alt:"alt"}
    ],
    [{url:"https://a0.muscache.com/im/pictures/miso/Hosting-856575418570950976/original/7e4f0998-7a54-41a6-8554-74af5b6fc176.jpeg?im_w=1200", alt:"alt"},
    {url:"https://a0.muscache.com/im/pictures/miso/Hosting-856575418570950976/original/f889d7a8-ff91-45ba-83c0-96eca5fe99eb.jpeg?im_w=1440", alt:"alt"},
    {url:"https://a0.muscache.com/im/pictures/miso/Hosting-856575418570950976/original/0aaefcd2-395c-45c8-bb6d-a57275e26e55.jpeg?im_w=1440", alt:"alt"},
    {url:"https://a0.muscache.com/im/pictures/miso/Hosting-856575418570950976/original/43e32fd7-b9cf-421b-97b0-1cbf6be846f3.jpeg?im_w=1440", alt:"alt"}
    ],
    [{url:"https://a0.muscache.com/im/pictures/997261b3-1645-4766-bb72-dae4caca150c.jpg?im_w=1200", alt:"alt"},
    {url:"https://a0.muscache.com/im/pictures/3428ed39-728f-4599-b643-5f7ca7b8c25a.jpg?im_w=1440", alt:"alt"},
    {url:"https://a0.muscache.com/im/pictures/4422660e-9869-491a-81aa-4d4ec25f6e5f.jpg?im_w=1440", alt:"alt"},
    {url:"https://a0.muscache.com/im/pictures/293355a2-32aa-448f-acf6-4343094a77b4.jpg?im_w=1440", alt:"alt"}
    ],
    [{url:"https://a0.muscache.com/im/pictures/miso/Hosting-25178105/original/12bc582a-d987-4ab1-9ac8-da16c5f4fc6e.jpeg?im_w=1200", alt:"alt"},
    {url:"https://a0.muscache.com/im/pictures/miso/Hosting-25178105/original/0686f3f4-972f-4b52-9ba2-176524566d7e.jpeg?im_w=1440", alt:"alt"},
    {url:"https://a0.muscache.com/im/pictures/miso/Hosting-25178105/original/433583d0-385b-47ab-b743-ec8ef07a6c7d.jpeg?im_w=1440", alt:"alt"},
    {url:"https://a0.muscache.com/im/pictures/miso/Hosting-25178105/original/15fe6c94-cea3-470e-9644-4fff84ac4b28.jpeg?im_w=1440", alt:"alt"}
    ],
    [{url:"https://a0.muscache.com/im/pictures/10107995-8a8e-4354-83d2-1840269dae88.jpg?im_w=1200", alt:"alt"},
    {url:"https://a0.muscache.com/im/pictures/c8292ab2-7489-47d9-9c6e-371da6ee9e28.jpg?im_w=1440", alt:"alt"},
    {url:"https://a0.muscache.com/im/pictures/dbe4dd08-2119-4b3f-b96f-19987fd0ee95.jpg?im_w=1440", alt:"alt"},
    {url:"https://a0.muscache.com/im/pictures/10e6ca5a-fbc0-4c53-8631-4c1f06843ff8.jpg?im_w=1440", alt:"alt"}
    ],
    [{url:"https://a0.muscache.com/im/pictures/miso/Hosting-53968461/original/e3e8c6ba-4cb8-43bd-95b5-134b91b7310e.jpeg?im_w=1200", alt:"alt"},
    {url:"https://a0.muscache.com/im/pictures/miso/Hosting-53968461/original/1efd46ce-3c17-488d-b580-fcb973a003da.jpeg?im_w=1440", alt:"alt"},
    {url:"https://a0.muscache.com/im/pictures/miso/Hosting-53968461/original/0ce18f13-833b-4f8f-9086-6f04fe189274.jpeg?im_w=1440", alt:"alt"},
    {url:"https://a0.muscache.com/im/pictures/8312f16e-e0d8-4465-885d-e3847793eb47.jpg?im_w=1440", alt:"alt"}
    ],
    [{url:"https://a0.muscache.com/im/pictures/abaf8b89-5850-455b-8ade-653664fe9405.jpg?im_w=1200", alt:"alt"},
    {url:"https://a0.muscache.com/im/pictures/miso/Hosting-53572443/original/b8569157-5815-4cb3-8562-e058397c9402.jpeg?im_w=1440", alt:"alt"},
    {url:"https://a0.muscache.com/im/pictures/miso/Hosting-53572443/original/45e31d62-5348-44a8-9561-f21619404ef6.jpeg?im_w=1440", alt:"alt"},
    {url:"https://a0.muscache.com/im/pictures/miso/Hosting-53572443/original/e5462a3b-bf80-4319-abe6-7512c87a648c.jpeg?im_w=1440", alt:"alt"}
    ],
  ]

  //observable type
  public currentType: BehaviorSubject<string> = new BehaviorSubject<string>('');

  //observable filter validation
  public filterIsValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );
  private _currentFilterState: FilterState = emptyFilter;

  //observable filter
  public currentFilterState: BehaviorSubject<FilterState> =
    new BehaviorSubject<FilterState>(this._currentFilterState);

  /*
   * TODO llamar al backend para recibir el filtrado de casas disponibles
   * */
  public filterHomeStaysByConditions(
    type?: string,
    filter?: FilterState,
  ): BehaviorSubject<HomeStayInformation[]> {
    this.availableHomeStays.forEach((homeStay) => {});
    return new BehaviorSubject<HomeStayInformation[]>(this.availableHomeStays);
  }

  public getAvailableHomeStay(): Observable<HomeStayInformation[]>{
    return this.http.get<HomeStayInformation[]>(this.url)
  }

  public getHomeStay(id: number){ 
    return this.http.get<HomeStayInformation>(`${this.url}/${id}`)
  }

  /*
  public currentPricePerNightRange: number[min,max]
  public currentNumberOfRooms: number
  public currentNumberOfGuests: number
  public currentNumberOfBathrooms: number
  public currentServicesAvailable: String[]
  * */

  public changeCurrentType(type: string) {
    this.currentType.next(type);
  }

  public changeCurrentFilterState(state: FilterState): void {
    this._currentFilterState = state;
    this.validateCurrentFilterState();
  }

  private validateCurrentFilterState(): void {
    if (
      this._currentFilterState.numberOfGuests <= 0 ||
      this._currentFilterState.numberOfRooms <= 0 ||
      this._currentFilterState.numberOfBathrooms <= 0 ||
      this._currentFilterState.maxPricePerNight <
        this._currentFilterState.minPricePerNight
    ) {
      this.filterIsValid.next(false);
    } else {
      this.filterIsValid.next(true);
    }
  }
  /*
   * Va a cambiar cuando se pueda llamar a la BBDD y obtener los tipos disponibles
   * */
  public getHomeStayTypes(): HomeStayType[] {
    return [
      {
        type: 'Cabaña',
        vectorImage: {
          url: 'https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg',
          alt: '',
          height: 20,
          width: 20,
        },
      },
      {
        type: 'Casa Chica',
        vectorImage: {
          url: 'https://a0.muscache.com/pictures/3271df99-f071-4ecf-9128-eb2d2b1f50f0.jpg',
          alt: '',
          height: 20,
          width: 20,
        },
      },
      {
        type: 'Casa Grande',
        vectorImage: {
          url: 'https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg',
          alt: '',
          height: 20,
          width: 20,
        },
      },
      {
        type: 'Ruca',
        vectorImage: {
          url: 'https://a0.muscache.com/pictures/1d477273-96d6-4819-9bda-9085f809dad3.jpg',
          alt: '',
          height: 20,
          width: 20,
        },
      },
      {
        type: 'Apartamento Pequeño',
        vectorImage: {
          url: 'https://a0.muscache.com/pictures/251c0635-cc91-4ef7-bb13-1084d5229446.jpg',
          alt: '',
          height: 20,
          width: 20,
        },
      },
    ];
  }

  /**
   * Formatea el precio de entero a formato plata
   */

  public intToMoneyFormat(mount: number, changeType?: String): String {
    let toCharArray = mount.toString().split('');
    let stack: String[] = [];
    let count = 0;
    for (let i = toCharArray.length - 1; i >= 0; i--) {
      stack.push(toCharArray[i]);
      count++;
      if (count % 3 == 0) {
        stack.push(',');
      }
    }

    let output = '';
    while (stack.length != 0) {
      output += stack.pop();
    }

    return '$' + output + ' ' + changeType;
  }
}

/*
 * Cada tipo de arriendo tiene un nombre y un icono/imagen predeterminado
 * Debe almacenarse en la BBDD, de lo contrario, crear un archivo assets
 * */
export interface HomeStayType {
  type: string;
  vectorImage: ImageDTO;
}
