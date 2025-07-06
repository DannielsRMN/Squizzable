import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MenuVisibilityService } from '../../services/visible.service';
import { especialidad } from '../../models/especialidad.model';

@Component({
  selector: 'app-crud-especializaciones',
  standalone: false,
  templateUrl: './crud-especializaciones.component.html',
  styleUrl: './crud-especializaciones.component.css',
  providers: [ApiService]
})
export class CRUDEspecializacionesComponent {

  constructor(private api: ApiService, private menu: MenuVisibilityService) {
      this.mostrarMenu = true;
    }

    mostrarMenu = true

    ngOnInit() {
      this.obtenerEspecialidades();

      setTimeout(() => {
        this.menu.showMenu();
      }, 0);
    }

    especialidades: especialidad[];
    visible: boolean = false;
    nuevoEspecialidad: boolean = true;
    especialidadDialogo: especialidad = new especialidad();

    abrirDialogo() {
      this.visible = true;
      this.nuevoEspecialidad = true;
      this.especialidadDialogo = new especialidad()
    }

    obtenerEspecialidades() {
      this.api.getEspecialidad().subscribe(res => {
        this.especialidades = res;
      })
    }

    editarEspecialidad(especialidad: especialidad) {
      this.visible = true;
      this.nuevoEspecialidad = false;
      this.especialidadDialogo = especialidad;
    }

    eliminarEspecialidad(especialidad: especialidad) {
      this.api.deleteEspecialidad(especialidad.idEspecialidad.toString()).subscribe(() => {
        this.obtenerEspecialidades();
      });
    }

    guardarEspecialidad() {

      if (this.nuevoEspecialidad) {
        this.api.postEspecialidad(this.especialidadDialogo).subscribe(res => {
          this.obtenerEspecialidades();
        });
      } else {
        this.api.putEspecialidad(this.especialidadDialogo).subscribe(res => {
          this.obtenerEspecialidades();
        });
      }

      this.visible = false
    }

}
