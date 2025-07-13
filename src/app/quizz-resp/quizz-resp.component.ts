import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { forkJoin } from 'rxjs';

// Importamos los modelos que ya existen
import { tema } from '../../models/tema.model';
import { pregunta } from '../../models/pregunta.model';
import { alternativa } from '../../models/alternativa.model';
import { usuario } from '../../models/usuario.models';

// Interfaz local para manejar la estructura de datos
export interface PreguntaConAlternativas extends pregunta {
  alternativas: alternativa[];
}

@Component({
  standalone: false,
  selector: 'app-quizz-resp',
  templateUrl: './quizz-resp.component.html',
  styleUrls: ['./quizz-resp.component.css']
})
export class QuizzRespComponent implements OnInit, OnDestroy {

  // --- Estados del Componente ---
  public estado: 'cargando' | 'bienvenida' | 'enProgreso' | 'preguntaRespondida' | 'finalizado' = 'cargando';

  // --- Datos del Quizz ---
  public temaActual: tema | undefined; // <-- CORRECCIÓN 1: Acepta que el tema pueda ser undefined
  public preguntasDelTema: PreguntaConAlternativas[] = [];
  public preguntaActualIndex = 0;

  // --- Puntuación ---
  public puntajeTotal = 0;
  private puntosPorPregunta = 0;

  // --- Temporizador ---
  public tiempoRestante = 30;
  private timerInterval: any;

  // --- UI y UX ---
  public alternativaSeleccionadaId: number | null = null;
  public nombreUsuario = 'Usuario'; // TODO: Obtener el nombre real

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    const idTema = Number(this.route.snapshot.paramMap.get('id'));

    if (idTema) {
      forkJoin({
        temas: this.api.getTema(),
        preguntas: this.api.getPregunta(),
        alternativas: this.api.getAlternativa()
      }).subscribe(({ temas, preguntas, alternativas }) => {

        // 1. Encontrar el tema actual
        this.temaActual = temas.find(t => t.idTema === idTema);

        // --- CORRECCIÓN 2: Comprobamos si el tema existe antes de continuar ---
        if (!this.temaActual) {
          console.error('Error: No se encontró el tema con el ID proporcionado.');
          this.router.navigate(['/Modulo']); // O a una página de error
          return;
        }

        // 2. Filtrar las preguntas que pertenecen a este tema y ordenarlas
        const preguntasFiltradas = preguntas
          .filter(p => p.tema === idTema)
          .sort((a, b) => a.idPregunta - b.idPregunta);

        // 3. Si no hay preguntas, no podemos continuar
        if (preguntasFiltradas.length === 0) {
          // Esta lógica se maneja en 'seleccion', pero es una buena salvaguarda.
          this.router.navigate(['/seleccion', this.temaActual.modulo]);
          return;
        }

        // 4. Ensamblar las preguntas con sus 4 alternativas
        this.preguntasDelTema = preguntasFiltradas.map(pregunta => {
          const alternativasDeLaPregunta = alternativas
            .filter(a => a.pregunta === pregunta.idPregunta)
            .slice(0, 4);
          return { ...pregunta, alternativas: alternativasDeLaPregunta };
        });

        // 5. Calcular los puntos por pregunta
        this.puntosPorPregunta = this.temaActual.puntosTotal / this.preguntasDelTema.length;

        // 6. Estamos listos, vamos a la pantalla de bienvenida
        this.estado = 'bienvenida';
      });
    }
  }

  empezarQuizz(): void {
    this.estado = 'enProgreso';
    this.iniciarTemporizador();
  }

  seleccionarRespuesta(alternativaSeleccionada: alternativa): void {
    if (this.estado === 'preguntaRespondida') {
      return;
    }

    clearInterval(this.timerInterval);
    this.estado = 'preguntaRespondida';
    this.alternativaSeleccionadaId = alternativaSeleccionada.idAlternativa;

    if (alternativaSeleccionada.esCorrecta) {
      this.puntajeTotal += this.puntosPorPregunta;
    }

    setTimeout(() => {
      this.siguientePregunta();
    }, 1600);
  }

  siguientePregunta(): void {
    if (this.preguntaActualIndex < this.preguntasDelTema.length - 1) {
      this.preguntaActualIndex++;
      this.estado = 'enProgreso';
      this.alternativaSeleccionadaId = null;
      this.tiempoRestante = 30;
      this.iniciarTemporizador();
    } else {
      this.finalizarQuizz();
    }
  }

  iniciarTemporizador(): void {
    this.timerInterval = setInterval(() => {
      if (this.tiempoRestante > 0) {
        this.tiempoRestante--;
      } else {
        this.siguientePregunta();
      }
    }, 1000);
  }

  usuario_id: string | null = localStorage.getItem('user_id');
  nuevosPuntos: number = 0;

actualizarPuntosUsuario() {
  if (!this.usuario_id) {
    console.error('No se encontró el ID de usuario en localStorage.');
    return;
  }

  this.api.getUsuario(this.usuario_id).subscribe(
    resp => {

      if (this.usuario_id == null) {
        console.error('El ID de usuario es nulo.');
      } else {
        const puntosActuales = resp.puntos || 0;
        this.nuevosPuntos = puntosActuales + this.puntajeTotal;
        this.api.patchPuntosUsuario(this.usuario_id, this.nuevosPuntos).subscribe(
        () => {
          console.log('Puntos actualizados correctamente:', this.nuevosPuntos);
        },
        error => {
          console.error('Error al actualizar los puntos del usuario:', error);
        }
      );
      }
    },
    error => {
      console.error('Error al obtener los puntos del usuario:', error);
    }
  );
}

  finalizarQuizz(): void {
    this.estado = 'finalizado';
    console.log('Quizz finalizado! Puntuación final:', this.puntajeTotal);
    this.actualizarPuntosUsuario();
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}
