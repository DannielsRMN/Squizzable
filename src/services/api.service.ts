import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { alternativa } from "../models/alternativa.model";
import { especialidad } from "../models/especialidad.model";
import { usuario } from "../models/usuario.models";
import { modulo } from "../models/modulo.model";
import { pregunta } from "../models/pregunta.model";
import { tema } from "../models/tema.model";
import { progreso } from "../models/progreso.model";

@Injectable({
  providedIn: "root"
})

export class ApiService {
  private ApiUrl = "http://127.0.0.1:8000/api/"; // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {
  }

  // CRUD Modulo
  public getModulo(): Observable<modulo[]> {
    return this.http.get<modulo[]>(this.ApiUrl + 'Modulo/');
  }

  public deleteModulo(id: string): Observable<void> {
    return this.http.delete<void>(this.ApiUrl + 'Modulo/' + id + "/");
  }

  public putModulo(modulo: modulo): Observable<modulo> {
    let body = JSON.stringify(modulo);
    return this.http.put<modulo>(this.ApiUrl + 'Modulo/' + modulo.idModulo + "/", body, this.httpOptions);
  }

  public postModulo(modulo: modulo): Observable<modulo> {
    let body = JSON.stringify(modulo);
    return this.http.post<modulo>(this.ApiUrl + 'Modulo/', body, this.httpOptions);
  }

  public getModuloPersonales(id: string): Observable<modulo[]> {
    return this.http.get<modulo[]>(this.ApiUrl + 'modulos/' + id + "/");
  }

  // CRUD Especialidad
  public getEspecialidad(): Observable<especialidad[]> {
    return this.http.get<especialidad[]>(this.ApiUrl + 'Especialidad');
  }

  public deleteEspecialidad(id: string): Observable<void> {
    return this.http.delete<void>(this.ApiUrl + 'Especialidad/' + id + "/");
  }

  public putEspecialidad(especialidad: especialidad): Observable<especialidad> {
    let body = JSON.stringify(modulo);
    return this.http.put<especialidad>(this.ApiUrl + 'Especialidad/' + especialidad.idEspecialidad + "/", body, this.httpOptions);
  }

  public postEspecialidad(especialidad: especialidad): Observable<especialidad> {
    let body = JSON.stringify(especialidad);
    return this.http.post<especialidad>(this.ApiUrl + 'Especialidad/', body, this.httpOptions);
  }

  // CRUD Usuario
  public postUsuario(usuario: usuario): Observable<usuario> {
    let body = JSON.stringify(usuario);
    return this.http.post<usuario>(this.ApiUrl + 'Usuario/', body, this.httpOptions);
  }

  public getUsuariosClasificados(): Observable<usuario[]> {
    return this.http.get<usuario[]>(this.ApiUrl + 'clasificacion/');
  }

  public getUsuariosClasificadosModular(id: string): Observable<usuario[]> {
    return this.http.get<usuario[]>(this.ApiUrl + 'clasificacion/' + id + "/");
  }

  public patchPuntosUsuario(id: string, puntos: number): Observable<usuario> {
    let body = JSON.stringify({ puntos: puntos });
    return this.http.patch<usuario>(this.ApiUrl + 'Usuario/' + id + "/", body, this.httpOptions);
  }

  public getUsuario(id: string): Observable<usuario> {
    return this.http.get<usuario>(this.ApiUrl + 'Usuario/' + id + '/');
  }

    //CRUG PREGUNTA

  public getPregunta(): Observable<pregunta[]> {
    return this.http.get<pregunta[]>(this.ApiUrl + 'Preguntas/');
  }

  public deletePregunta(idPregunta: string): Observable<void> {
    return this.http.delete<void>(this.ApiUrl + 'Preguntas/' + idPregunta + "/");
  }

  public putPregunta(pregunta: pregunta): Observable<pregunta> {
    let body = JSON.stringify(pregunta);
    return this.http.put<pregunta>(this.ApiUrl + 'Preguntas/' + pregunta.idPregunta + "/", body, this.httpOptions);
  }

  public postPregunta(pregunta: pregunta): Observable<pregunta> {
    let body = JSON.stringify(pregunta);
    return this.http.post<pregunta>(this.ApiUrl + 'Preguntas/', body, this.httpOptions);
  }

  //CRUG alternativa
  public getAlternativa(): Observable<alternativa[]> {
    return this.http.get<alternativa[]>(this.ApiUrl + 'Alternativa');
  }

  public deleteAlternativa(id: string): Observable<void> {
    return this.http.delete<void>(this.ApiUrl + 'Alternativa/' + id + "/");
  }

  public putAlternativa(alternativa: alternativa): Observable<alternativa> {
    let body = JSON.stringify(alternativa);
    return this.http.put<alternativa>(this.ApiUrl + 'Alternativa/' + alternativa.idAlternativa + "/", body, this.httpOptions);
  }

  public postAlternativa(alternativa: alternativa): Observable<alternativa> {
    let body = JSON.stringify(alternativa);
    return this.http.post<alternativa>(this.ApiUrl + 'Alternativa/', body, this.httpOptions);
  }

  // CRUD Tema
  public getTema(): Observable<tema[]> {
    return this.http.get<tema[]>(this.ApiUrl + 'Temas/');
  }

  public deleteTema(id: string): Observable<void> {
    return this.http.delete<void>(this.ApiUrl + 'Temas/' + id + "/");
  }

  public putTema(tema: tema): Observable<tema> {
    let body = JSON.stringify(tema);
    return this.http.put<tema>(this.ApiUrl + 'Temas/' + tema.idTema + "/", body, this.httpOptions);
  }

  public postTema(tema: tema): Observable<tema> {
    let body = JSON.stringify(tema);
    return this.http.post<tema>(this.ApiUrl + 'Temas/', body, this.httpOptions);
  }

  public getTemaXModulo(id: string): Observable<tema[]> {
    return this.http.get<tema[]>(this.ApiUrl + 'Temas/' + id + '/');
  }

  // CRUD Progreso
  public getProgresosPersonales(id: string): Observable<progreso[]> {
    return this.http.get<progreso[]>(this.ApiUrl + 'Progresos/' + id + '/');
  }



}
