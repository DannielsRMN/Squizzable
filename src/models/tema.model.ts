import { modulo } from "./modulo.model";

export class tema{
  idTema: number
  nombreTema: string
  contenido: string
  puntosTotal: number
  modulo: number | modulo
}
