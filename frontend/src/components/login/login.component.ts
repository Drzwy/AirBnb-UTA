import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../services/login-register.service';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private loginRegisterService: LoginRegisterService,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  user: userLogin = {
    email: '',
    password: '',
  }

  public login(user: NgForm) {
    // this.http.post('https://localhost:3000/auth/login', this.user).subscribe, para cuando este funcionando el backend
    this.loginRegisterService.login(this.user).subscribe(result =>{
      if(result){
        alert('login success')
        this.router.navigateByUrl('home-stay-list')
      } else {
        alert('no existe mi loco')
      }
    })
  }

  public register(){
    this.router.navigateByUrl('register');
  }

}

export interface userLogin {
  email: string,
  password: string
}