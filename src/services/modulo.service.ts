import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { modulo } from "../models/modulo.model";

@Injectable({
  providedIn: "root"
})

export class ModuloService {
    private ApiUrl = "http://127.0.0.1:8000/api/"; // URL to web api
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    };
    constructor(private http: HttpClient) {
    }

    public getModulo(): Observable<modulo[]> {
        return this.http.get<modulo[]>(this.ApiUrl + 'Modulo');
    }

    public deleteModulo(id:string): Observable<void>{
        return this.http.delete<void>(this.ApiUrl + 'Modulo/' + id + "/");
    }

    public putModulo(modulo:modulo): Observable<modulo>{
        let body = JSON.stringify(modulo);
        return this.http.put<modulo>(this.ApiUrl + 'Modulo/' + modulo.idModulo + "/",body,this.httpOptions);
    }

    public postModulo(modulo:modulo): Observable<modulo>{
        let body = JSON.stringify(modulo);
        return this.http.post<modulo>(this.ApiUrl + 'Modulo/',body,this.httpOptions);
    }

}
