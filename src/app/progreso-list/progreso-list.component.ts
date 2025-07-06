import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

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

  

}
