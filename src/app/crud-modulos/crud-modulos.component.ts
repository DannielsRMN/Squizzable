import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { modulo } from '../../models/modulo.model';
import { especialidad } from '../../models/especialidad.model';

@Component({
  selector: 'app-crud-modulos',
  standalone: false,
  templateUrl: './crud-modulos.component.html',
  styleUrl: './crud-modulos.component.css',
  providers: [ApiService]

})
export class CrudModulosComponent {

  constructor(private api: ApiService) {
      this.mostrarMenu = true;
    }

    mostrarMenu = true

    ngOnInit() {
      this.obtenerModulos();
      this.obtenerEspecialidades();
    }

    modulos: modulo[];
    visible: boolean = false;
    nuevoModulo: boolean = true;
    moduloDialogo: modulo = new modulo();

    dificultades: string[] = ['Fácil', 'Intermedio', 'Avanzado']
    dif_select: string;

    especialidades: especialidad[];
    espe_select: especialidad;

    abrirDialogo() {
      this.visible = true;
      this.moduloDialogo = new modulo();
    }

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

    editarModulo(modulo: modulo) {
      this.visible = true;
      this.nuevoModulo = false;
      this.moduloDialogo = modulo;
      this.espe_select = this.especialidades.find(t => t.idEspecialidad === modulo.especialidad)!;
    }

    eliminarModulo(modulo: modulo) {
      this.api.deleteModulo(modulo.idModulo.toString()).subscribe(() => {
        this.obtenerModulos();
      });
    }

    guardarModulo() {
      this.moduloDialogo.especialidad = this.espe_select.idEspecialidad;
      this.moduloDialogo.dificultad = this.dif_select;

      if (this.nuevoModulo) {
        this.api.postModulo(this.moduloDialogo).subscribe(res => {
          this.obtenerModulos();
        });
      } else {
        this.api.putModulo(this.moduloDialogo).subscribe(res => {
          this.obtenerModulos();
        });
      }

      this.visible = false
    }

}
