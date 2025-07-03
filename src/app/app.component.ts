import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { MenuVisibilityService } from '../services/visible.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
  providers: [AuthService]
})
export class AppComponent {

  constructor(private login: AuthService, private router: Router, private menu: MenuVisibilityService, private conf: AuthService) {
    this.isSuperuser$ = this.conf.isSuperuser$;
  }

  // Admin Cookie
  isSuperuser$: Observable<string | null>;


  // Mostra Menu
  menuVisible: boolean = true;
  private menuSubscription: Subscription = new Subscription();

  // Menú Bar
  items: MenuItem[] | undefined;

  // Menú Vertical
  vertical: MenuItem[] | undefined;

  // Modo Oscuro
  isDarkMode = false;
  loading: boolean = false;

  toggleDarkMode() {
    const element = document.documentElement;
    element.classList.toggle('dk');
    this.isDarkMode = element.classList.contains('dk');
    localStorage.setItem('darkMode', this.isDarkMode ? 'true' : 'false');

    this.loading = true;
    setTimeout(() => {
      this.loading = false
    }, 200);
    console.log("D/Tema cambiado")
  }

  logOut() {
    this.login.logOff()
  }

  ngOnDestroy(){
    this.menuSubscription.unsubscribe();
  }

  ngOnInit() {
    // Modo Oscuro
    const htmlElement = document.documentElement;
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (this.isDarkMode) {
      htmlElement.classList.add('dk');
    }

    // Visibilidad de Menú
    this.menuSubscription = this.menu.menuVisible$.subscribe(
      (isVisible: boolean) => {
        this.menuVisible = isVisible;
      }
    );

    this.items = []

    this.vertical = [
      {
        label: 'Opciones',
        items: [
          {
            label: 'Módulos',
            icon: 'pi pi-plus',
            command: () => {
              this.router.navigate(['/Modulo'])
            }
          },
          {
            label: 'Progreso',
            icon: 'pi pi-search'
          },
          {
            label: 'Ranking General',
            icon: 'pi pi-cog'
          },
          {
            label: 'Ranking Modular',
            icon: 'pi pi-cog'
          },
        ]
      },
      {
        label: 'Administrador',
        items: [
          {
            label: 'Modulo',
            icon: 'pi pi-cog',
            routerLink: '/Modulo'
          },
          {
            label: 'Especialidad',
            icon: 'pi pi-sign-out',
            routerLink: '/Especialidad'
          }
        ]
      },
      {
        label: 'Sesion',
        items: [
          {
            label: 'Cuenta',
            icon: 'pi pi-cog'
          },
          {
            label: 'Cerrar Sesión',
            icon: 'pi pi-sign-out',
            command: () => {
              this.logOut()
            }
          }
        ]
      }
    ];
  }
}
