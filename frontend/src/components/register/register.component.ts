import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginRegisterService } from '../../services/login-register.service';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements AfterViewInit {
  constructor(
    private router: Router,
    private loginRegisterService: LoginRegisterService,
  ) {}

  ngAfterViewInit() {
    $('#languages').select2({
      theme: 'bootstrap-5',
      width: $(this).data('width')
        ? $(this).data('width')
        : $(this).hasClass('w-100')
          ? '100%'
          : 'style',
      closeOnSelect: false,
    });

    $('#languages').on('change', (event: any) => {
      const selectedValues = $(event.target).val();
      this.selectedLanguages = selectedValues ? selectedValues : [];
      console.log(this.selectedLanguages);
    });
  }

  // Objeto para almacenar los datos del formulario
  user: userRegister = {
    email: '',
    hash: '',
    run: '',
    nombre: '',
    apellidoPat: '',
    apellidoMat: '',
    descripcion: '',
    idiomas: [],
    detalles: [],
  };

  public availableLanguages: string[] = [
    'Español',
    'Inglés',
    'Francés',
    'Alemán',
    'Italiano',
  ];
  private selectedLanguages: string[] = [];
  public detail: string = '';

  register(form: NgForm) {
    if (form.valid) {
      this.user.idiomas = this.selectedLanguages;
      this.user.detalles = this.detail.split(',');
      this.loginRegisterService.register(this.user).subscribe((result) => {
        if (result && result.success) {
          alert('Usuario registrado correctamente');
          this.router.navigateByUrl('home-stay-list');
        } else {
          alert(result.message);
        }
      });
    }
  }

  public login() {
    this.router.navigateByUrl('login');
  }

  public checkRun(run: string): boolean {
    // Eliminar el guion del RUN
    run = run.replace(/-/g, '');

    // Extraer el dígito verificador y el número
    const cdEntered = run.slice(-1).toUpperCase();
    const number = run.slice(0, -1);

    // Calcular el dígito verificador esperado
    let add = 0;
    let factor = 2;
    for (let i = number.length - 1; i >= 0; i--) {
      add += parseInt(number.charAt(i)) * factor;
      factor = factor === 7 ? 2 : factor + 1;
    }
    const cdExpected = 11 - (add % 11);
    const cdCalculated =
      cdExpected === 11 ? '0' : cdExpected === 10 ? 'K' : cdExpected.toString();

    // Comparar el dígito verificador ingresado con el calculado
    return cdEntered === cdCalculated;
  }
}
// interfaz para guardar los datos del usuario a registrar
export interface userRegister {
  email: string;
  hash: string;
  run: string;
  nombre: string;
  apellidoPat: string;
  apellidoMat: string;
  descripcion?: string;
  idiomas: string[];
  detalles: string[];
}
