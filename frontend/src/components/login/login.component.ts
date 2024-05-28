import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../services/login-register.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private loginRegisterService: LoginRegisterService,
    private http: HttpClient,
  ) {}

  ngOnInit() {}

  user: userLogin = {
    email: '',
    hash: '',
  };

  public login(user: NgForm) {
    this.loginRegisterService.login(this.user).subscribe((result) => {
      if (result && result.success) {
        alert('Inicio sesion correctamente');
        this.router.navigateByUrl('home-stay-list');
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
