import { Component } from '@angular/core';
import { especialidad } from '../../models/especialidad.model';
import { modulo } from '../../models/modulo.model';
import { ApiService } from '../../services/api.service';
import { MenuVisibilityService } from '../../services/visible.service';

@Component({
  selector: 'app-modulos',
  standalone: false,
  templateUrl: './modulos.component.html',
  styleUrl: './modulos.component.css',
  providers: [ApiService]
})
export class ModulosComponent {

  constructor(private api: ApiService, private menu: MenuVisibilityService) {
    this.mostrarMenu = true;
  }

  mostrarMenu = true

  ngOnInit() {
    this.obtenerModulos();
    this.obtenerEspecialidades();

    setTimeout(() => {
      this.menu.showMenu();
    }, 0);
  }

  modulos: modulo[];
  visible: boolean = false;
  nuevoModulo: boolean = true;
  moduloDialogo: modulo = new modulo();

  dificultades: string[] = ['facil', 'intermedio', 'avanzado']
  dif_select: string;

  especialidades: especialidad[];
  espe_select: especialidad;

  abrirDialogo() {
    this.visible = true;
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


