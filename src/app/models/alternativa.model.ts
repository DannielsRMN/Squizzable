export interface Alternativa {
  idAlternativa: number;     // Para mis ids
  alternativa: string;       // Texto de la alternativa (La respuesta ps, HIJO)
  esCorrecta: boolean;       // Para ver si es correcta o no (Recordar que siempre hay una correcta, no te olvides MARMOTA)
  pregunta: number;          // id de la pregunta a la que pertenece esta alternativa (No se porque estoy comentando esto, si es obvio, pero bueno, no me voy a quejar XD)
}

// Adición by EDSON DO. Modelo para Alternativa