import { Component } from '@angular/core';

@Component({
  selector: 'app-house-visualizer',
  templateUrl: './house-visualizer.component.html',
  styleUrl: './house-visualizer.component.css'
})
export class HouseVisualizerComponent {

  public house: HouseExample = {
    imagesUrl : [
        "https://i0.wp.com/blogdelblock.com/wp-content/uploads/2020/05/lego-ideas-casa-de-up-01.jpeg?fit=1125%2C900&ssl=1",

    ],
    houseName : "Bello apartamento paradisiaco",
    hostName  : "Abelardo Puertas",
    pricePerNight: 123000,
    valuations : ["Muy Bueno, tiene ventanas","Hace calor adentro pero afuera está fresquito"]
  }


}

interface HouseExample{
  imagesUrl: String[],
  houseName: String,
  hostName: String,
  pricePerNight: Number,
  valuations: String[]
}



