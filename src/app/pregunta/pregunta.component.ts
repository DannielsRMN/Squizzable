import { Component } from '@angular/core';
import { pregunta } from '../../models/pregunta.model';
import { tema } from '../../models/tema.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-pregunta',
  standalone: false,
  templateUrl: './pregunta.component.html',
  styleUrl: './pregunta.component.css',
  providers: [ApiService]
})
export class PreguntaComponent {


  constructor(private api: ApiService) { }

  preguntas: pregunta[];
  visible: boolean = false;
  nuevoPregunta: boolean = true;
  preguntaDialogo: pregunta = new pregunta();
  temas: tema[];
  temaSelecionado: tema;

  obtenerPregunta() {
    this.api.getPregunta().subscribe(res => {
      this.preguntas = res;
    })
  }

  obtenerTema() {
    this.api.getTema().subscribe(res => {
      this.temas = res;
    });
  }
  ngOnInit() {
    this.obtenerPregunta();
    this.obtenerTema();
  }

  editarPregunta(pregunta: pregunta) {
    this.visible = true;
    this.nuevoPregunta = false,
      this.preguntaDialogo = pregunta;
  }

  eliminarPregunta(pregunta: pregunta) {
    this.api.deletePregunta(pregunta.idPregunta.toString()).subscribe(() => {
      this.obtenerPregunta();
    })
  }

  abrirPegunta() {
    this.visible = true;
    this.preguntaDialogo = new pregunta();
  }

  guardarPregunta() {
    this.preguntaDialogo.tema = this.temaSelecionado.idTema;
    if (this.nuevoPregunta) {

      this.api.postPregunta(this.preguntaDialogo).subscribe(res => {
        this.obtenerPregunta();
      });
    } else {
      this.api.putPregunta(this.preguntaDialogo).subscribe(res => {
        this.obtenerPregunta();
      });
    }
    this.visible = false;
  }

}
