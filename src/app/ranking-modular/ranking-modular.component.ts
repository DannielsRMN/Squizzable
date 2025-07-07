import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { usuario } from '../../models/usuario.models';
import { especialidad } from '../../models/especialidad.model';

@Component({
  selector: 'app-ranking-modular',
  standalone: false,
  templateUrl: './ranking-modular.component.html',
  styleUrl: './ranking-modular.component.css',
  providers: [ApiService]

})
export class RankingModularComponent {

    constructor(private api: ApiService) { }

    usuariosClasificados: usuario[] = [];

    id: string;
    listEspecialidad: especialidad[];

    cargarEspecialidad(){
      this.api.getEspecialidad().subscribe(res => {
        this.listEspecialidad = res;
      })
    }

    cargarUsuariosClasificados(id: string = '0') {
      this.api.getUsuariosClasificadosModular(id).subscribe(res => {
        this.usuariosClasificados = res;
      });
    }

    onEspecialidadChange(event: any) {
      console.log(event.value);
      this.id = event.value;
      this.cargarUsuariosClasificados(this.id);
    }

    ngOnInit() {
      this.cargarUsuariosClasificados();
      this.cargarEspecialidad();
    }

}
