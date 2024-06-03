import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HomestayApiService } from './homestay-api.service';
import { HomeStayForm } from '../components/add-home-stay/add-home-stay.component';
import { HomeStayCreateDTOResponse } from './homestay-api.service';

describe('HomestayApiService', () => {
  let service: HomestayApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomestayApiService],
    });
    service = TestBed.inject(HomestayApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call deleteHomeStay with the correct URL', () => {
    const id: number = 123;
    service.deleteHomeStay(id).subscribe();

    const req = httpTestingController.expectOne(
      `http://localhost:3000/homestays/delete/${id}`,
    );
    expect(req.request.method).toEqual('DELETE');
    req.flush(null);
  });

  it('should handle invalid HomeStay form', () => {
    const form: HomeStayForm = {
      guests: 2,
      rooms: 0,
      beds: 1,
      bathrooms: 1,
      type: 'Apartment',
      desc: 'Nice place',
      street: 'Main St',
      streetNumber: 123,
      depNumber: 1,
      pricePerNight: 20000,
      services: 'WiFi',
      securityOptions: 'Security Guard',
      arrivalOptions: 'Self Check-In',
      rules: 'No smoking',
      location: 'City',
      images: [],
      initDate: new Date('2024-10-10'), //RANGO DE FECHA MAL PUESTA
      finishDate: new Date('2024-09-09'), //VER SI TIRA ERROR
      userId: 1,
    };

    service.sendHomeStayForm(form).subscribe({
      error: (error) => {
        expect(error).toEqual(
          new Error(
            'Formulario incompleto o datos no ingresados correctamente. Por favor, completa todos los campos.',
          ),
        );
      },
    });
  });

  it('should send HomeStay form correctly', () => {
    const form: HomeStayForm = {
      guests: 2,
      rooms: 2,
      beds: 1,
      bathrooms: 1,
      type: 'Apartment',
      desc: 'Nice place',
      street: 'Main St',
      streetNumber: 123,
      depNumber: 1,
      services: 'WiFi',
      securityOptions: 'Security Guard',
      arrivalOptions: 'Self Check-In',
      rules: 'No smoking',
      location: 'City',
      initDate: new Date(),
      finishDate: new Date(),
      images: [],
      userId: 1,
      pricePerNight: 100,
    };

    const response: HomeStayCreateDTOResponse = {
      dormitorios: form.rooms,
      camas: form.beds,
      banos: form.bathrooms,
      maxPersonas: form.guests,
      precioNoche: form.pricePerNight,
      tipo: form.type,
      descripcion: form.desc,
      calle: form.street,
      nroCasa: form.streetNumber,
      nroDpto: form.depNumber,
      comodidades: [form.services],
      opcionesDeSeguridad: [form.securityOptions],
      opcionesDeLlegada: [form.arrivalOptions],
      reglas: [form.rules],
      anfitrionId: form.userId,
      fotos: form.images,
      pais: form.location,
      ciudad: form.location,
      fechasDisponibles: [form.initDate, form.finishDate],
    };

    service.sendHomeStayForm(form).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/homestays/create',
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(response);
    req.flush(response);
  });
});
