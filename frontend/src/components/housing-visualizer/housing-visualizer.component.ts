import { Component } from '@angular/core';
import {ImageDTO} from "./images-card/image-card.component";

@Component({
  selector: 'app-housing-visualizer',
  templateUrl: './housing-visualizer.component.html',
  styleUrl: './housing-visualizer.component.css'
})
export class HousingVisualizerComponent {

  public house: HouseExample = {
    imagesUrl : [
      {url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F-SSv1BZ5Uh9Q%2FU8Q6sbOxAlI%2FAAAAAAAACCo%2F0XpzHemw4A4%2Fs1600%2FArquitectura-Casa-de-playa-isla-Creta.jpg&f=1&nofb=1&ipt=71297c913fd1e44deb991e248532a41940362569cf5abfa1f22c6c95594425c1&ipo=images",
        alt: "playa"},
      {url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fplayascalas.com%2Fwp-content%2F2014%2F08%2FFotos-playas-paradisiacas12.jpg&f=1&nofb=1&ipt=f1dd7829a4025688784272303d7c45d9a4cc7c4d66614f607ca1b1c630be2e4d&ipo=images",
        alt: "playa2"},
      {url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdecoraideas.com%2Fwp-content%2Fuploads%2F2019%2F08%2F07-1.jpg&f=1&nofb=1&ipt=e1a7e5d8255222e1a0cc0077610baaca5acb40d0aeab4a02628d8bd68d5eaa66&ipo=images",
        alt: "casa por dentro"}

    ],
    houseName : "Bello apartamento paradisiaco",
    hostName  : "Abelardo Puertas",
    pricePerNight: 123000,
    valuations : ["Muy Bueno, tiene ventanas","Hace calor adentro pero afuera está fresquito"]
  }

  public  TEXTS = {
    anfitrion: "Anfitrion:",
    precio: "Precio:",
    precioPorNoche: "por noche",
    valoraciones: "Mira las valoraciones"
  }


}

interface HouseExample{
  imagesUrl: ImageDTO[],
  houseName: String,
  hostName: String,
  pricePerNight: Number,
  valuations: String[]
}



