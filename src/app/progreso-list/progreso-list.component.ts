import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { progreso } from '../../models/progreso.model';

@Component({
  selector: 'app-progreso-list',
  standalone: false,
  templateUrl: './progreso-list.component.html',
  styleUrl: './progreso-list.component.css',
  providers: [ApiService]
})
export class ProgresoListComponent {

  constructor(private api: ApiService, private conf: AuthService){
  }

  mostrarMenu = true
  UserID: string = localStorage.getItem('user_id') || '';

  progresos: progreso[] = [];

  obtenerProgresosFiltrados(){
    this.api.getProgresosPersonales(this.UserID).subscribe(res => {
      this.progresos = res;
    });
  }

  ngOnInit() {
    this.obtenerProgresosFiltrados();
  }

}
