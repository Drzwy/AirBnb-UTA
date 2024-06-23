import { Component, OnInit } from '@angular/core';
import { ImageDTO } from './images-card/image-card.component';
import { HousingInformation } from './housing-info-displayer/housing-info-displayer.component';
import { HousingPrice } from './housing-reservation/housing-reservation.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeDisplayService } from '../../services/home-display.service';
import { HomeStayInformation } from '../home-stay-list/home-stay-list.component';


@Component({
  selector: 'app-housing-visualizer',
  templateUrl: './housing-visualizer.component.html',
  styleUrl: './housing-visualizer.component.css',
})
export class HousingVisualizerComponent implements OnInit{
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private homeStayservice: HomeDisplayService 
  ) {
    this.startDate2 = null;
    this.endDate2 = null;
    this.nights2 = 0;
  }

  ngOnInit(){
    this.route.params.subscribe(params =>{
      this.id = +params['id']
    })
    this.img = this.homeStayservice.images[this.id%8]
    this.homeStayservice.getHomeStay(this.id).subscribe((value) =>{
      this.homeStay = value
    })
  }

  public id: number = 0;
  public img: ImageDTO[] = [];
  public homeStay!: HomeStayInformation
  public isExpanded: boolean[] = [];

  //fechas del calendario del componente reservation
  public startDate2: Date | null;
  public endDate2: Date | null;
  public nights2: number;
  
  public house: HouseExample = {
    imagesUrl: [
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50788889/original/87249781-c250-463e-92e6-82391681da29.jpeg?im_w=1200',
        alt: 'playa',
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50788889/original/896501f7-3435-4274-8e0f-d8a399cc0c9b.jpeg?im_w=1440',
        alt: 'playa2',
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50788889/original/061e7561-3d88-4c47-b258-101c5b15fb84.jpeg?im_w=1440',
        alt: 'casa por dentro',
      },
      {
        url: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdecoraideas.com%2Fwp-content%2Fuploads%2F2019%2F08%2F07-1.jpg&f=1&nofb=1&ipt=e1a7e5d8255222e1a0cc0077610baaca5acb40d0aeab4a02628d8bd68d5eaa66&ipo=images',
        alt: 'casa por dentro',
      },
      {
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50788889/original/b1bfc6c8-6942-4725-8f6f-96078a5b1d13.jpeg?im_w=1440',
        alt: 'turistas',
      },
    ],
    houseDescriptionParagraphs: [
      'Bienvenido al paraíso costero que siempre has soñado. Esta encantadora casa en la playa es el refugio perfecto para aquellos que buscan paz, serenidad y la belleza incomparable del océano. Con vistas panorámicas al mar desde casi todas las habitaciones, esta propiedad ofrece una experiencia de vida costera incomparable.',
      'Ubicada en una pintoresca comunidad frente al mar, esta casa de estilo contemporáneo irradia calidez y comodidad desde el momento en que pones un pie dentro. Con una arquitectura que fusiona la elegancia moderna con el encanto rústico de la costa, cada detalle ha sido cuidadosamente diseñado para crear un ambiente acogedor y relajante.',
      'Disfruta de tus mañanas con el sonido de las olas rompiendo suavemente en la playa, mientras tomas tu café en la terraza con vistas al horizonte infinito. Los días de verano se vuelven aún más gloriosos con acceso directo a la playa, donde puedes disfrutar de nadar, practicar surf o simplemente relajarte bajo el sol.',
    ],
    houseName: 'Bello apartamento paradisiaco',
    hostName: 'Abelardo Puertas',
    prices: {
      pricePerNight: 80000,
      cleaningFee: 25000,
      airbnbServiceFee: 17641,
    },
    valuations: [
      {
        name: 'Juan',
        img: 'https://a0.muscache.com/im/pictures/user/97d09175-b85f-456b-bffa-fce460d2fe13.jpg?im_w=240',
        city: 'Mar del plata',
        country: 'Argentina',
        date: new Date(2022, 10),
        stars: 1,
        text: 'Todo espectacular, la ubicación, la decoración y la atención en resumen, el departamento y los anfitriones son increíbles!! La vista y el lugar es mucho mejor que las fotos. Estuvimos unas noches y ha sido uno de los mejores AIRBNB en los que he estado. Gracias Benjamín y Gastón.',
      },
      {
        name: 'Juan',
        img: 'https://a0.muscache.com/im/pictures/user/97d09175-b85f-456b-bffa-fce460d2fe13.jpg?im_w=240',
        city: 'Mar del plata',
        country: 'Argentina',
        date: new Date(2022, 10),
        stars: 3,
        text: 'Tuve una estancia corta en Gaston Place. El alojamiento está hermoso, limpio y cómodo. Gaston es un anfitrión amable y receptivo. Tuvimos un vuelo tardío y amablemente nos dejó salir más tarde en el día. Todos y cada uno, lugar recomendado cuando te hospedas en Santiago, Chile.',
      },
      {
        name: 'Juan',
        img: 'https://a0.muscache.com/im/pictures/user/97d09175-b85f-456b-bffa-fce460d2fe13.jpg?im_w=240',
        city: 'Mar del plata',
        country: 'Argentina',
        date: new Date(2022, 10),
        stars: 4,
        text: 'No podría decir lo suficiente sobre estas personas. Muy complaciente, tan receptivo. Hermosa vista increíble del apartamento.',
      },
      {
        name: 'Juan',
        img: 'https://a0.muscache.com/im/pictures/user/97d09175-b85f-456b-bffa-fce460d2fe13.jpg?im_w=240',
        city: 'Mar del plata',
        country: 'Argentina',
        date: new Date(2022, 10),
        stars: 5,
        text: 'Mi estancia en el Apartamento de Playa en Santa Cruz, Bolivia, fue una experiencia excepcional. Desde el momento en que llegamos, nos recibieron con una cálida bienvenida y un servicio atento que nos hizo sentir como en casa de inmediato. Ubicado a lo largo de la costa del río Piraí, el apartamento ofrece vistas impresionantes y acceso directo a una playa tranquila y arenosa. Nos alojamos en un cómodo apartamento con vista al río, equipado con todo lo necesario para una estancia relajante. El personal fue amable y servicial, brindándonos recomendaciones locales y asegurándose de que nuestra estadía fuera placentera. Disfrutamos de las actividades acuáticas, como kayak y natación, así como de paseos relajantes por la orilla del río. El ambiente en el apartamento era tranquilo y relajado, perfecto para desconectar y disfrutar de la naturaleza. En resumen, mi estancia en el Apartamento de Playa en Santa Cruz fue una escapada maravillosa que recomendaría a cualquier persona que busque un retiro costero en Bolivia.',
      },
    ],
    location: 'Santa Cruz, Bolivia',
    houseType: 'Apartamento de playa',
    informationOfNumber: {
      numberOfGuests: 6,
      numberOfRooms: 3,
      numberOfBathrooms: 2,
    },
    services: [
      'Cama con colchoneta',
      'Agua caliente en la tarde',
      'SPA con piedras calientes',
      'Avion privado pero que no vuela',
      'Tenedor electrico multifuncional',
      'Cocina futuristica con combustible nuclear',
    ],
    rules:
      'Este alojamiento tiene una capacidad máxima de 4 huéspedes, sin contar bebés. No se permiten mascotas.',
  };

  public names: string[] = [
    "Retiro de ensueño junto al mar",
    "Escapada romántica en la montaña",
    "Encantador refugio urbano",
    "Paraíso tropical con vista al mar",
    "Alojamiento elegante en el corazón de la ciudad",
    "Refugio acogedor con vistas espectaculares",
    "Escapada de lujo en el bosque",
    "Rincón mágico junto al lago",
  ]

  public TEXTS = {
    hostIs: 'Anfitrion:',
    priceIs: 'Precio:',
    pricePerNight: 'por noche',
    ratings: 'Mira las valoraciones',
    description: 'Más sobre esta vivienda',
    locatedIn: 'en',
    servicesList: 'Lo que este lugar ofrece',
  };

  public volver() {
    this.router.navigate(['home-stay-list']);
  }

  public expand(index: number) {
    this.isExpanded[index] = !this.isExpanded[index];
  }

  public housingInformation(): HousingInformation{
    const housingInformation: HousingInformation = {
      numberOfGuests: this.homeStay.maxPersonas,
      numberOfBathrooms: this.homeStay.banos,
      numberOfBeds: this.homeStay.camas,
      numberOfRooms: this.homeStay.dormitorios
    }
    return housingInformation
  }
  public housingPrices(): HousingPrice{
    const housingPrices: HousingPrice = {
      pricePerNight: this.homeStay.precioNoche,
      cleaningFee: 0.08,
      airbnbServiceFee: 0.14
    }
    return housingPrices
  } 

  public onStartDateSelected(date: any) {
    this.startDate2 = date;
    console.log("LLEGO S")
  }

  public onEndDateSelected(date: any) {
    this.endDate2 = date;
    console.log("LLEGO E")
  }

  public onNightsSelected(nights: any) {
    this.nights2 = nights;
    console.log("LLEGO N")
  }

}

interface HouseExample {
  imagesUrl?: ImageDTO[];
  houseName?: String;
  hostName?: String;
  houseDescriptionParagraphs?: String[];
  prices: HousingPrice;
  valuations?: any;
  informationOfNumber: HousingInformation;
  services?: String[];
  houseType?: String;
  location?: String;
  rules: string;
}
