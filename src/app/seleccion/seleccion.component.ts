import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { forkJoin } from 'rxjs';
import { tema } from '../../models/tema.model';
import { modulo } from '../../models/modulo.model';

// Acá pondré una interfaz local para la nueva cosita que queremos hacer, muchachines
export interface TemaConEstado extends tema {
  tienePreguntas: boolean;
}

@Component({
  selector: 'app-seleccion',
  standalone: false, 
  templateUrl: './seleccion.component.html',
  styleUrls: ['./seleccion.component.css']
})
export class SeleccionComponent implements OnInit {

  public temasDelModulo: TemaConEstado[] = [];
  public nombreModulo = '';
  public estado: 'cargando' | 'listo' | 'sinTemas' = 'cargando';

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idModulo = Number(this.route.snapshot.paramMap.get('id'));

    if (idModulo) {
      forkJoin({
        modulo: this.api.getModulo(),
        temas: this.api.getTema(),
        preguntas: this.api.getPregunta()
      }).subscribe(({ modulo, temas, preguntas }) => {
        
        const moduloActual = modulo.find(m => m.idModulo === idModulo);
        if (moduloActual) {
          this.nombreModulo = moduloActual.nombreModulo;
        }

        const temasFiltrados = temas.filter(t => t.modulo === idModulo);

        if (temasFiltrados.length === 0) {
          this.estado = 'sinTemas';
          return;
        }

        this.temasDelModulo = temasFiltrados
          .map(tema => {
            const tienePreguntas = preguntas.some(p => p.tema === tema.idTema);
            return { ...tema, tienePreguntas: tienePreguntas };
          })
          .sort((a, b) => b.idTema - a.idTema);

        this.estado = 'listo';
      });
    }
  }

  iniciarQuizz(idTema: number): void {
    this.router.navigate(['/quizz-resp', idTema]);
  }

  volverAModulos(): void {
    this.router.navigate(['/Modulo']);
  }
}
