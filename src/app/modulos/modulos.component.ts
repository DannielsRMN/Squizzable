import { Component } from '@angular/core';
import { especialidad } from '../../models/especialidad.model';
import { modulo } from '../../models/modulo.model';
import { ApiService } from '../../services/api.service';
import { MenuVisibilityService } from '../../services/visible.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modulos',
  standalone: false,
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.css',
  providers: [ApiService]
})
export class ModulosComponent {

  constructor(private api: ApiService, private menu: MenuVisibilityService, private conf: AuthService) {
    this.mostrarMenu = true;
    this.cargo$ = this.conf.cargo$;
  }

  cargo$: Observable<string | null>;

  mostrarMenu = true

  ngOnInit() {
    this.obtenerModulos();
    this.obtenerEspecialidades();

    setTimeout(() => {
      this.menu.showMenu();
    }, 0);
  }

  modulos: modulo[];
  especialidades: especialidad[];

  obtenerModulos() {
    this.api.getModulo().subscribe(res => {
      this.modulos = res;
    })
  }

  obtenerEspecialidades() {
    this.api.getEspecialidad().subscribe(res => {
      this.especialidades = res;
    })
  }
}


