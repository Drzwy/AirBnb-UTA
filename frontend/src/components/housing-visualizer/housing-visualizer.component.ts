import { Component, OnInit } from '@angular/core';
import { ImageDTO } from './images-card/image-card.component';
import { HousingInformation } from './housing-info-displayer/housing-info-displayer.component';
import { Guests, HousingPrice } from './housing-reservation/housing-reservation.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeDisplayService, reviews } from '../../services/home-display.service';
import { HomeStayInformation } from '../home-stay-list/home-stay-list.component';
import { forkJoin, map, mergeMap } from 'rxjs';


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
  }

  ngOnInit(){
    this.route.params.subscribe(params =>{
      this.id = +params['id']
    })
    this.homeStayservice.getHomeStay(this.id).subscribe((value) =>{
      this.homeStay = value
      this.maxGuests = {
        adults: value.maxAdultos,
        children: value.maxNinos,
        infants: value.maxBebes,
        pets: value.maxMascotas,
      }
    })
    this.getReviews(this.id)
  }

  public id: number = 0;
  public img: ImageDTO[] = [];
  public homeStay!: HomeStayInformation
  public isExpanded: boolean[] = [];
  public reviews: any[] = []
  public users: any[] = []
  public maxGuests!: Guests

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
    rules: 'Reglas de la casa',
    security: 'Seguridad y propiedad',
    options: 'Lo que debes saber'
  };

  public volver() {
    this.router.navigate(['home-stay-list']);
  }

  public expand(index: number) {
    this.isExpanded[index] = !this.isExpanded[index];
  }

  public housingInformation(): HousingInformation{
    const housingInformation: HousingInformation = {
      numberOfGuests: this.homeStay.maxAdultos + this.homeStay.maxNinos,
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
  
  public getRatings(id: number): string{
    const filteredReviews = this.reviews.filter(review => review.propiedadCriticadaId === id);
    const rating = filteredReviews.reduce((sum, review) => sum + review.puntuacion, 0);
    return filteredReviews.length > 0 ? (rating / filteredReviews.length).toFixed(1) : "0";
  }

  public getReviews(id: number) {
    this.homeStayservice.getReviewsByID(id).pipe(
      mergeMap((reviews: any[]) => {
        const usuarioIds = reviews.map(review => review.usuarioCreadorId);
        const requests = usuarioIds.map(userId => this.homeStayservice.getUserById(userId));
        return forkJoin(requests).pipe(
          map((usuarios: any[]) => {
            reviews.forEach((review, index) => {
              review.usuarioCreadorInfo = usuarios[index]; 
            });
            return reviews; 
          })
        );
      })
    ).subscribe((result) => {
      console.log(result)
      this.reviews = result; 
    });
  }
  public dateFormat(date: Date): string {
    let date2 = new Date(date) 
    return date2.toLocaleString("es-ES", {
      month: "long",
      year: "numeric"
    });
  }

  public getUser(id:number){
    this.homeStayservice.getUserById(id).subscribe((result =>{
      console.log(result, 'xd')
      this.users.push(result)
    }))
  }

}
