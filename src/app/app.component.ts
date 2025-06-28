import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
  providers: [AuthService]
})
export class AppComponent {

  // Mostra Menu
  mostrarMenu = true;

  constructor(private login: AuthService, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const rutasSinMenu = ['/login'];

        this.mostrarMenu = !rutasSinMenu.includes(event.urlAfterRedirects);
      });
  }

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

  ngOnInit() {
    const htmlElement = document.documentElement;
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (this.isDarkMode) {
      htmlElement.classList.add('dk');
    }

    this.items = []

    this.vertical = [
      {
        label: 'Opciones',
        items: [
          {
            label: 'Módulos',
            icon: 'pi pi-plus',
            command: () => {
              this.router.navigate(['/modulo'])
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
