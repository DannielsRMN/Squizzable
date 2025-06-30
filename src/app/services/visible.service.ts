import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuVisibilityService {
  // BehaviorSubject mantiene el último valor y emite el valor inicial a los nuevos suscriptores
  private _menuVisible = new BehaviorSubject<boolean>(true);

  // Expone la visibilidad del menú como un Observable para que los componentes puedan suscribirse
  menuVisible$: Observable<boolean> = this._menuVisible.asObservable();

  constructor() { }

  // Método para ocultar el menú
  hideMenu() {
    this._menuVisible.next(false);
  }

  // Método para mostrar el menú
  showMenu() {
    this._menuVisible.next(true);
  }

  // Método para alternar la visibilidad (opcional)
  toggleMenu() {
    this._menuVisible.next(!this._menuVisible.value);
  }
}
