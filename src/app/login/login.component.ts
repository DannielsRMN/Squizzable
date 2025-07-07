import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]
})
export class LoginComponent {

  constructor(private inicioSesion: AuthService) {}

  username: string = '';
  password: string = '';
  error = '';

  rememberMe: boolean = true;

  login() {
    this.inicioSesion.login(this.username, this.password);
  }

  ngOnInit(){

  }

}
