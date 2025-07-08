import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
  providers: [AuthService]
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private login: AuthService, private router: Router, private conf: AuthService) {
  }

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
    }, 100);
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

    // Admin
    let admin = localStorage.getItem('is_superuser');
    console.log("Admin: " + admin);

    this.items = []

    this.vertical = [
      {
        label: 'Opciones',
        items: [
          {
            label: 'Módulos',
            icon: 'pi pi-plus',
            command: () => {
              this.router.navigate(['/Squizable/Modulo'])
            }
          },
          {
            label: 'Progreso',
            icon: 'pi pi-search',
            command: () => {
              this.router.navigate(['/Squizable/Progreso'])
            }
          },
          {
            label: 'Ranking General',
            icon: 'pi pi-cog',
            command: () => {
              this.router.navigate(['/Squizable/RankingGeneral'])
            }
          },
          {
            label: 'Ranking Modular',
            icon: 'pi pi-cog',
            command: () => {
              this.router.navigate(['/Squizable/RankingModular'])
            }
          },
        ]
      },
      {
        label: 'Administrador',
        items: [
          {
            label: 'Modulo',
            icon: 'pi pi-cog',
            routerLink: '/Squizable/Modulos'
          },
           {
            label: 'Temas',
            icon: 'pi pi-cog',
            routerLink: '/Squizable/Temas'
          },
          {
            label: 'Especialidad',
            icon: 'pi pi-sign-out',
            routerLink: '/Squizable/Especialidades'
          },
          {
            label: 'Preguntas',
            icon: 'pi pi-sign-out',
            routerLink: '/Squizable/Preguntas'
          },
          {
            label: 'Alternativas',
            icon: 'pi pi-sign-out',
            routerLink: '/Squizable/Alternativas'
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
