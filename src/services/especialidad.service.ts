import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { especialidad } from "../models/especialidad.model";

@Injectable({
  providedIn: "root"
})

export class EspecialidadService {
    private ApiUrl = "http://127.0.0.1:8000/api/"; // URL to web api
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {
    }

    public getEspecialidades(): Observable<especialidad[]> {
        return this.http.get<especialidad[]>(this.ApiUrl + 'Especialidad');
    }

    public deleteEspecialidad(id:string): Observable<void>{
        return this.http.delete<void>(this.ApiUrl + 'Especialidad/' + id + "/");
    }

    public putEspecialidad(especialidad:especialidad): Observable<especialidad>{
        let body = JSON.stringify(especialidad);
        return this.http.put<especialidad>(this.ApiUrl + 'Especialidad/' + especialidad.idEspecialidad + "/",body,this.httpOptions);
    }

    public postEspecialidad(especialidad:especialidad): Observable<especialidad>{
        let body = JSON.stringify(especialidad);
        return this.http.post<especialidad>(this.ApiUrl + 'Especialidad/',body,this.httpOptions);
    }

}
