import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { usuario } from '../../models/usuario.models';

@Component({
  selector: 'app-ranking-general',
  standalone: false,
  templateUrl: './ranking-general.component.html',
  styleUrl: './ranking-general.component.css',
  providers: [ApiService]
})
export class RankingGeneralComponent {

  constructor(private api: ApiService) { }

  usuariosClasificados: usuario[] = [];

  cargarUsuariosClasificados() {
    this.api.getUsuariosClasificados().subscribe(res => {
    this.usuariosClasificados = res;
    });
  }

  ngOnInit() {
    this.cargarUsuariosClasificados();
  }

}
