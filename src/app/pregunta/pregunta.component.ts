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


  constructor(private api:ApiService){}

preguntas:pregunta[];
visible:boolean=false;
nuevoPregunta:boolean=true;
preguntaDialogo:pregunta= new pregunta();
temas:tema[];
temaSelecionado:tema;

obtenerProducto(){
  this.api.getPregunta().subscribe(res=>{
    this.preguntas=res;
  })


}

obtenerTema(){
  this.comp.getTema().subscribe(res=>{
    this.temas=res;
  });
}
  ngOnInit(){
this.obtenerProducto();
this.obtenerTema();

  }

  editarPregunta(poducto: pregunta){
 

  }

  eliminarPregunta(p: pregunta){
this.api.deletePregunta(p.idPregunta.toString()).subscribe()
  
  }
 

  abrirPegunta(){
  this.visible=true;
     
  }

guardarPregunta(){
 this.preguntaDialogo.tema=this.temaSelecionado.idTema;
  if(this.nuevoPregunta){

    this.api.postPregunta(this.preguntaDialogo).subscribe(res=>{
      this.obtenerProducto();
    });
  }else {
    this.api.putPregunta(this.preguntaDialogo).subscribe(res=>{
      this.obtenerProducto();
    });
  }
  this.visible=false;
}

}


