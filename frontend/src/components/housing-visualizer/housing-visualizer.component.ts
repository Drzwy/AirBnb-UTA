import { Component } from '@angular/core';
import {ImageDTO} from "./images-card/image-card.component";
import {HousingInformation} from "./housing-info-displayer/housing-info-displayer.component";

@Component({
  selector: 'app-housing-visualizer',
  templateUrl: './housing-visualizer.component.html',
  styleUrl: './housing-visualizer.component.css'
})
export class HousingVisualizerComponent {

  public isExpanded: boolean[] = [];

  public expand(index: number){
    this.isExpanded[index] = !this.isExpanded[index];
  }

  public house: HouseExample = {
    imagesUrl : [
      {url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F-SSv1BZ5Uh9Q%2FU8Q6sbOxAlI%2FAAAAAAAACCo%2F0XpzHemw4A4%2Fs1600%2FArquitectura-Casa-de-playa-isla-Creta.jpg&f=1&nofb=1&ipt=71297c913fd1e44deb991e248532a41940362569cf5abfa1f22c6c95594425c1&ipo=images",
        alt: "playa"},
      {url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fplayascalas.com%2Fwp-content%2F2014%2F08%2FFotos-playas-paradisiacas12.jpg&f=1&nofb=1&ipt=f1dd7829a4025688784272303d7c45d9a4cc7c4d66614f607ca1b1c630be2e4d&ipo=images",
        alt: "playa2"},
      {url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdecoraideas.com%2Fwp-content%2Fuploads%2F2019%2F08%2F07-1.jpg&f=1&nofb=1&ipt=e1a7e5d8255222e1a0cc0077610baaca5acb40d0aeab4a02628d8bd68d5eaa66&ipo=images",
        alt: "casa por dentro"},
      {url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdecoraideas.com%2Fwp-content%2Fuploads%2F2019%2F08%2F07-1.jpg&f=1&nofb=1&ipt=e1a7e5d8255222e1a0cc0077610baaca5acb40d0aeab4a02628d8bd68d5eaa66&ipo=images",
        alt: "casa por dentro"},
      {url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7puN0vHdrBgYNCEiI4OTFZhTfVZIQsUNFaWg2_NQnkw&s",
        alt: "turistas"}

    ],
    houseDescriptionParagraphs: [
        "Bienvenido al paraíso costero que siempre has soñado. Esta encantadora casa en la playa es el refugio perfecto para aquellos que buscan paz, serenidad y la belleza incomparable del océano. Con vistas panorámicas al mar desde casi todas las habitaciones, esta propiedad ofrece una experiencia de vida costera incomparable.",
        "Ubicada en una pintoresca comunidad frente al mar, esta casa de estilo contemporáneo irradia calidez y comodidad desde el momento en que pones un pie dentro. Con una arquitectura que fusiona la elegancia moderna con el encanto rústico de la costa, cada detalle ha sido cuidadosamente diseñado para crear un ambiente acogedor y relajante.",
        "Disfruta de tus mañanas con el sonido de las olas rompiendo suavemente en la playa, mientras tomas tu café en la terraza con vistas al horizonte infinito. Los días de verano se vuelven aún más gloriosos con acceso directo a la playa, donde puedes disfrutar de nadar, practicar surf o simplemente relajarte bajo el sol."
    ],
    houseName : "Bello apartamento paradisiaco",
    hostName  : "Abelardo Puertas",
    pricePerNight: 123000,
    valuations : [
      "Todo espectacular, la ubicación, la decoración y la atención en resumen, el departamento y los anfitriones son increíbles!! La vista y el lugar es mucho mejor que las fotos. Estuvimos unas noches y ha sido uno de los mejores AIRBNB en los que he estado. Gracias Benjamín y Gastón.",
      "Tuve una estancia corta en Gaston Place. El alojamiento está hermoso, limpio y cómodo. Gaston es un anfitrión amable y receptivo. Tuvimos un vuelo tardío y amablemente nos dejó salir más tarde en el día. Todos y cada uno, lugar recomendado cuando te hospedas en Santiago, Chile.",
      "No podría decir lo suficiente sobre estas personas. Muy complaciente, tan receptivo. Hermosa vista increíble del apartamento.",
      "Mi estancia en el Apartamento de Playa en Santa Cruz, Bolivia, fue una experiencia excepcional. Desde el momento en que llegamos, nos recibieron con una cálida bienvenida y un servicio atento que nos hizo sentir como en casa de inmediato. Ubicado a lo largo de la costa del río Piraí, el apartamento ofrece vistas impresionantes y acceso directo a una playa tranquila y arenosa. Nos alojamos en un cómodo apartamento con vista al río, equipado con todo lo necesario para una estancia relajante. El personal fue amable y servicial, brindándonos recomendaciones locales y asegurándose de que nuestra estadía fuera placentera. Disfrutamos de las actividades acuáticas, como kayak y natación, así como de paseos relajantes por la orilla del río. El ambiente en el apartamento era tranquilo y relajado, perfecto para desconectar y disfrutar de la naturaleza. En resumen, mi estancia en el Apartamento de Playa en Santa Cruz fue una escapada maravillosa que recomendaría a cualquier persona que busque un retiro costero en Bolivia."
    ],
    location: "Santa Cruz, Bolivia",
    houseType: "Apartamento de playa",
    informationOfNumber: {
      numberOfGuests: 6,
      numberOfRooms: 3,
      numberOfBathrooms: 2,
    },
    services: [
        "Cama con colchoneta",
        "Agua caliente en la tarde",
        "SPA con piedras calientes",
        "Avion privado pero que no vuela",
        "Tenedor electrico multifuncional",
        "Cocina futuristica con combustible nuclear"
    ]
  }

  public  TEXTS = {
    hostIs: "Anfitrion:",
    priceIs: "Precio:",
    pricePerNight: "por noche",
    ratings: "Mira las valoraciones",
    description: "Más sobre esta vivienda",
    locatedIn: "en",
    servicesList: "Lo que este lugar ofrece"

    
  }


}

interface HouseExample{
  imagesUrl?: ImageDTO[],
  houseName?: String,
  hostName?: String,
  houseDescriptionParagraphs?: String[];
  pricePerNight?: Number,
  valuations?: String[],
  informationOfNumber: HousingInformation
  services?: String[],
  houseType?: String,
  location?: String
}



