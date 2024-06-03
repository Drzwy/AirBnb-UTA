import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import {HomeStayCreateDTO} from "../../../backend/src/homestay/dto"
import { HomeStayForm } from '../components/add-home-stay/add-home-stay.component';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomestayApiServiceService {
  constructor(private http: HttpClient) {}

  public validateForm(form: HomeStayForm) {
    /*if (
      form.rooms < 1 ||
      form.beds < 1 ||
      form.bathrooms < 1
    ){
      const userCreatePost = new HomeStayCreateDTO()
      userCreatePost.dormitorios = form.rooms
      userCreatePost.banos = form.bathrooms
      userCreatePost.camas = form.beds
      userCreatePost.calle = form.street
      userCreatePost.descripcion = form.desc
      userCreatePost.tipo = form.type
      userCreatePost.fechas_disponibles = [form.initDate, form.finishDate]
      userCreatePost.comodidades = [form.services]
      userCreatePost.reglas = [form.rules]
      userCreatePost.opciones_de_seguridad = [form.securityOptions!, "otra opción"]
      userCreatePost.opciones_de_llegada = [form.arrivalOptions!, "otra opción"]
      if (form.streetNumber) userCreatePost.numero_casa = form.streetNumber
      if (form.depNumber) userCreatePost.numero_dpto = form.depNumber

      userCreatePost.ownerId = ( Math.random() * 100 )% 1

      this.sendForm(userCreatePost)

      return new BehaviorSubject<boolean>(true)
    }
    return new BehaviorSubject<boolean>(false) */
  }

  /*
  private sendForm(dto: HomeStayCreateDTO) {
    this.http.post(
      "",
      dto
    )
  }

   */
}
