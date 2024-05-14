import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginRegisterService } from '../../services/login-register.service';
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {

  constructor(
    private router: Router,
    private loginRegisterService: LoginRegisterService
  ){}

  ngAfterViewInit() {
    $('#languages').select2({
      theme: "bootstrap-5",
      width: $( this ).data( 'width' ) ? $( this ).data( 'width' ) : $( this ).hasClass( 'w-100' ) ? '100%' : 'style',
      closeOnSelect: false
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
    password: '',
    run: '',
    name: '',
    lastName: '',
    moLastName: '',
    description: '',
    languages: [],
    details: []
  }; 

  public availableLanguages: string[] = ['Español', 'Inglés', 'Francés', 'Alemán', 'Italiano'];
  public selectedLanguages: string[] = [];

  register(form: NgForm) {
    if(form.valid){
      this.user.languages = this.selectedLanguages;
      this.loginRegisterService.register(this.user).subscribe(result => {
        if (result){
          alert("Usuario registrado correctamente");
          this.loginRegisterService.login(this.user)
          this.router.navigateByUrl('home-stay-list')
        } else {
          alert("El usuario ya esta registrado");
        }
      })
    }
  }

  public login(){
    this.router.navigateByUrl('login');
  }

  public checkRun(run: string): boolean {
    // Eliminar puntos y guiones del RUN
    run = run.replace(/-/g, '');

    // Extraer el dígito verificador y el número
    const dvIngresado = run.slice(-1).toUpperCase();
    const numero = run.slice(0, -1);
  
    // Calcular el dígito verificador esperado
    let suma = 0;
    let factor = 2;
    for (let i = numero.length - 1; i >= 0; i--) {
      suma += parseInt(numero.charAt(i)) * factor;
      factor = factor === 7 ? 2 : factor + 1;
    }
    const dvEsperado = 11 - (suma % 11);
    const dvCalculado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
  
    // Comparar el dígito verificador ingresado con el calculado
    return dvIngresado === dvCalculado;
  }


}
// interfaz para guardar los datos del usuario a registrar
export interface userRegister {
  email: string,
  password: string,
  run: string,
  name: string,
  lastName: string,
  moLastName: string,
  description?: string,
  languages?: string[],
  details?: string[],
  userType?: string // por ahora es opcional para pruebas
  clientType?: string // tambien pa probar xd no se donde guardar el tipo de cliente de cada usuario
}