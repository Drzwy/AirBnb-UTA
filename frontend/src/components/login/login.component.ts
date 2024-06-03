import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../services/login-register.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private loginRegisterService: LoginRegisterService,
  ) {}

  ngOnInit() {
  }

  @Input() modal: boolean = false
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    hash: new FormControl('', [Validators.required])
  });;

  public login() {
    this.loginRegisterService.login(this.loginForm.value).subscribe((result) => {
      if (result && result.success) {
        alert('Inicio sesion correctamente');
        if(!this.modal){
          this.router.navigateByUrl('home-stay-list');
        } else{
          this.router.navigateByUrl(this.router.url).then(() => {
            window.location.reload();
          });;
        }
        
      } else {
        alert(result.message);
      }
    });
  }

  public register() {
    this.router.navigateByUrl('register');
  }
}

export interface userLogin {
  email: string;
  hash: string;
}
