import { Component } from '@angular/core';
import { especialidad } from '../../models/especialidad.model';
import { modulo } from '../../models/modulo.model';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modulos',
  standalone: false,
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.css',
  providers: [ApiService]
})
export class ModulosComponent {

  constructor(private api: ApiService, private conf: AuthService, private router: Router) {
    this.mostrarMenu = true;
  }
  mostrarMenu = true
  espeID: string = localStorage.getItem('especialidad') || '';
  admin: string = localStorage.getItem('is_superuser') || '';

  ngOnInit() {
    this.obtenerModulos();
    console.log(this.espeID);
    console.log(this.admin);
  }

  modulos: modulo[];
  especialidades: especialidad[];

  obtenerModulos() {
    if (this.admin == 'false') {
      this.api.getModuloPersonales(this.espeID).subscribe(res => {
        this.modulos = res;
      });
    } else {
      this.api.getModulo().subscribe(res => {
        this.modulos = res;
      });
    }
  }

  // --- FUNCIÓN CORREGIDA ---
  // Ahora navega a la nueva ruta '/seleccion' pasando el ID del módulo.
  redirigirTemas(id: number) {
    this.router.navigate(['/seleccion', id]);
  }
}