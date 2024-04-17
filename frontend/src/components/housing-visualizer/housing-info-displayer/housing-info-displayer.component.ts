import {Component, Input} from '@angular/core';
@Component({
  selector: 'app-housing-info-displayer',
  templateUrl: './housing-info-displayer.component.html',
  styleUrl: './housing-info-displayer.component.css'
})
export class HousingInfoDisplayerComponent {
  @Input() public housingInformation: HousingInformation = {
    numberOfGuests: 0,
    numberOfBathrooms: 0,
    numberOfBeds: 0,
    numberOfRooms: 0
  }

  public NUMBEROF = {
    beds: "camas",
    bed: "cama",
    guests: "huespedes",
    guest: "huesped",
    rooms: "habitaciones",
    room: "habitación",
    bathrooms: "baños",
    bathroom: "baño"
  }

  public getNumberOf(): String[] {
    let numberOfItems: String[] = []
    let text: String

    if (this.housingInformation.numberOfGuests) {
      text = this.housingInformation.numberOfGuests.toString()
      this.housingInformation.numberOfGuests > 1 ?
          text +=" "+this.NUMBEROF.guests:
          text +=" "+this.NUMBEROF.guest
      numberOfItems.push(text)
    }

    if (this.housingInformation.numberOfRooms) {
      text = this.housingInformation.numberOfRooms.toString()
      this.housingInformation.numberOfRooms > 1 ?
          text +=" "+this.NUMBEROF.rooms:
          text +=" "+this.NUMBEROF.room
      numberOfItems.push(text)

    }

    if (this.housingInformation.numberOfBeds) {
      text = this.housingInformation.numberOfBeds.toString()
      this.housingInformation.numberOfBeds > 1 ?
          text +=" "+this.NUMBEROF.beds:
          text +=" "+this.NUMBEROF.bed
      numberOfItems.push(text)

    }

    if (this.housingInformation.numberOfBathrooms) {
      text = this.housingInformation.numberOfBathrooms.toString()
      this.housingInformation.numberOfBathrooms > 1 ?
          text +=" "+this.NUMBEROF.bathrooms:
          text +=" "+this.NUMBEROF.bathroom
      numberOfItems.push(text)
    }


    return numberOfItems


  }
}

export interface HousingInformation {
  numberOfGuests?: number,
  numberOfBeds?: number,
  numberOfRooms?: number,
  numberOfBathrooms?: number
}
