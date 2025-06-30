import { Component } from '@angular/core';
import { alternativa } from '../../models/alternativa.model';
import { pregunta } from '../../models/pregunta.model';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-alternativa',
  standalone: false,
  templateUrl: './alternativa.component.html',
  styleUrl: './alternativa.component.css',
  providers: [ApiService]
})
export class AlternativaComponent {

  constructor(private api : ApiService){}

  alternativas: alternativa[];
  visible:boolean = false;
  nuevoAlternativa:boolean = true;
  alternativaDialogo:alternativa = new alternativa();


  preguntas:pregunta[];
  pregun_select: pregunta;

  abrirDialogo(){
    this.visible = true;
  }

  obtenerAlternativa(){
    this.api.getAlternativa().subscribe(res => {
      this.alternativas = res;
    })
  }

  obtenerPreguntas(){
    this.api.getPregunta().subscribe(res => {
      this.preguntas = res;
    })
  }

  ngOnInit(){
    this.obtenerAlternativa();
    this.obtenerPreguntas();
  }

  editarAlternativa(alternativa:alternativa){

  }

  eliminarAlternativa(alternativa:alternativa){
    this.api.deleteAlternativa(alternativa.idAlternativa.toString()).subscribe()
    this.obtenerAlternativa()
  }

  guardarAlternativa(){
    this.alternativaDialogo.pregunta = this.pregun_select.idPregunta;
    if (this.nuevoAlternativa){
      this.api.postAlternativa(this.alternativaDialogo).subscribe(res=>{
        this.obtenerAlternativa()
      });
    
    } else {
      this.api.putAlternativa(this.alternativaDialogo).subscribe(res => {
        this.obtenerAlternativa();
      });
    }
    this.visible = false;
  }

}
