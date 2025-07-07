import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  mostrarMenu=true
  nombreUsuario: string | null;

  constructor(private conf: AuthService){
  }

  ngOnInit(): void {
    let nombre = localStorage.getItem('username');
    this.nombreUsuario = nombre;
  }

}
