import { Component } from '@angular/core';

@Component({
  selector: 'app-house-visualizer',
  templateUrl: './house-visualizer.component.html',
  styleUrl: './house-visualizer.component.css'
})
export class HouseVisualizerComponent {
  public house: HouseExample = {
    imagesUrl : ["url1","url2"],
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



