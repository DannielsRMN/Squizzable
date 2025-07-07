import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-platilla-menu',
  standalone: false,
  templateUrl: './platilla-menu.component.html',
  styleUrl: './platilla-menu.component.css',
  providers: [ApiService]
})
export class PlatillaMenuComponent {

  constructor(private login: AuthService, private router: Router, private conf: AuthService) {
  }

  // Admin
  admin: string | null = null;

  // Menú Bar
  items: MenuItem[] | undefined;

  // Menú Vertical
  vertical: MenuItem[] | undefined;
  vertical2: MenuItem[] | undefined;

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
    // Modo Oscuro
    const htmlElement = document.documentElement;
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (this.isDarkMode) {
      htmlElement.classList.add('dk');
    }

    // Admin
    this.admin = localStorage.getItem('is_superuser');
    console.log("Admin: " + this.admin);

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
            icon: 'pi pi-search',
            command: () => {
              this.router.navigate(['/Progreso'])
            }
          },
          {
            label: 'Ranking General',
            icon: 'pi pi-cog',
            command: () => {
              this.router.navigate(['/RankingGeneral'])
            }
          },
          {
            label: 'Ranking Modular',
            icon: 'pi pi-cog',
            command: () => {
              this.router.navigate(['/RankingModular'])
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
            routerLink: '/Modulos'
          },
          {
            label: 'Temas',
            icon: 'pi pi-cog',
            routerLink: '/Temas'
          },
          {
            label: 'Especialidad',
            icon: 'pi pi-sign-out',
            routerLink: '/Especialidades'
          },
          {
            label: 'Preguntas',
            icon: 'pi pi-sign-out',
            routerLink: '/Preguntas'
          },
          {
            label: 'Alternativas',
            icon: 'pi pi-sign-out',
            routerLink: '/Alternativas'
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

    this.vertical2 = [
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
            icon: 'pi pi-search',
            command: () => {
              this.router.navigate(['/Progreso'])
            }
          },
          {
            label: 'Ranking General',
            icon: 'pi pi-cog',
            command: () => {
              this.router.navigate(['/RankingGeneral'])
            }
          },
          {
            label: 'Ranking Modular',
            icon: 'pi pi-cog',
            command: () => {
              this.router.navigate(['/RankingModular'])
            }
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
