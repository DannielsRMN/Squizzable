import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MenuVisibilityService } from '../../services/visible.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [AuthService]
})
export class LoginComponent {

  constructor(private inicioSesion: AuthService, private menu: MenuVisibilityService) {}

  username: string = '';
  password: string = '';
  error = '';

  rememberMe: boolean = true;

  login() {
    this.inicioSesion.login(this.username, this.password);
    this.inicioSesion.obtenerNombre(this.username, this.password);
    this.inicioSesion.obtenerAdmin(this.username, this.password);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.menu.hideMenu();
    }, 0);
  }

}
