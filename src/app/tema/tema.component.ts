import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { tema } from '../../models/tema.model';
import { modulo } from '../../models/modulo.model';

@Component({
  selector: 'app-tema',
  standalone: false,
  templateUrl: './tema.component.html',
  styleUrl: './tema.component.css',
  providers: [ApiService]

})
export class TemaComponent {
  constructor(private api: ApiService) {

  }

  ngOnInit() {
    this.obtenerTema();
    this.obtenerModulos();


  }

  temas: tema[];
  visible: boolean = false;
  nuevoTema: boolean = true;
  temaDialogo: tema = new tema();


  modulos: modulo[];
  modu_select: modulo;

  abrirDialogo() {
    this.visible = true;
    this.temaDialogo = new tema();
  }

  obtenerModulos() {
    this.api.getModulo().subscribe(res => {
      this.modulos = res;
    })
  }

  obtenerTema() {
    this.api.getTema().subscribe(res => {
      this.temas = res;
    })
  }

  editarTema(tema: tema) {
    this.visible = true;
    this.nuevoTema = false;
    this.temaDialogo = tema;
    this.modu_select = this.modulos.find(t => t.nombreModulo === (tema.modulo as modulo).nombreModulo)!;
  }

  eliminarTema(tema: tema) {
    this.api.deleteTema(tema.idTema.toString()).subscribe(() => {
      this.obtenerTema();
    });
  }

  guardarTema() {
    // Asignar solo el ID del módulo seleccionado
    this.temaDialogo.modulo = this.modu_select.idModulo;

    if (this.nuevoTema) {
      this.api.postTema(this.temaDialogo).subscribe(() => {
        this.obtenerTema();
      });
    } else {
      this.api.putTema(this.temaDialogo).subscribe(() => {
        this.obtenerTema();
      });
    }

    this.visible = false;
  }

}
