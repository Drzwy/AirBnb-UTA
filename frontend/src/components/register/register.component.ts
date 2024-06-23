import { AfterViewInit, Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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

    $('#languagesModal').select2({
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
    });

    $('#languagesModal').on('change', (event: any) => {
      const selectedValues = $(event.target).val();
      this.selectedLanguages = selectedValues ? selectedValues : [];
    });
  }

  public registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    hash: new FormControl('', [Validators.required, Validators.pattern('(?=.*[A-Z])(?=.*\\d).{6,}')]),
    confirmHash: new FormControl('', [Validators.required, matchPasswordValidator()]),
    run: new FormControl('', [Validators.required, Validators.pattern(/^\d{1,8}-\d{1}$/), checkRunValidator()]),
    nombre: new FormControl('', [Validators.required]),
    apellidoPat: new FormControl('', [Validators.required]),
    apellidoMat: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    idiomas: new FormControl([]), //revisar validator.required
    detalles: new FormControl('', [Validators.required]),
  })

  @Input() modal: boolean = false;

  public availableLanguages: string[] = [
    'Español',
    'Inglés',
    'Francés',
    'Alemán',
    'Italiano',
  ];

  public selectedLanguages: string[] = [];

  register(): void {
    const user = {
      email: this.registerForm.get('email')?.value,
      hash: this.registerForm.get('hash')?.value,
      run: this.registerForm.get('run')?.value,
      nombre: this.registerForm.get('nombre')?.value,
      apellidoPat: this.registerForm.get('apellidoPat')?.value,
      apellidoMat: this.registerForm.get('apellidoMat')?.value,
      descripcion: this.registerForm.get('descripcion')?.value,
      idiomas: this.selectedLanguages,
      detalles: this.registerForm.get('detalles')?.value?.split(',') || [],
    };

    this.loginRegisterService.register(user).subscribe((result) => {
      if (result && result.success) {
        alert('Usuario registrado correctamente');
        if(!this.modal){
          this.router.navigateByUrl('home-stay-list');
        } else{
          this.router.navigateByUrl(this.router.url).then(()=>{
            window.location.reload();
          })
        }
        
      } else {
        alert(result?.message || 'Error al registrar el usuario');
      }
    });
  
  }

  public login() {
    this.router.navigateByUrl('login');
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

export function checkRunValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = checkRun(control.value);
    return isValid ? null : { invalidRun: true };
  };
}

export function matchPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const confirmHash = control.value;;
    const hash = control.root.get("hash");
   
    if (hash && hash.value !== confirmHash) {
      return { mismatch: true };
    }

    return null;
  };
}

function checkRun(run: string): boolean {
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