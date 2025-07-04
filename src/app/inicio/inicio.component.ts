import { Component } from '@angular/core';
import { MenuVisibilityService } from '../../services/visible.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  mostrarMenu=true
  nombreUsuario$: Observable<string | null>;
  isSuperuser$: Observable<string | null>;

  constructor(private menu: MenuVisibilityService, private conf: AuthService){
    this.mostrarMenu=true
    this.nombreUsuario$ = this.conf.name$;
    this.isSuperuser$ = this.conf.isSuperuser$;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.menu.showMenu();
    }, 0);
  }

}
