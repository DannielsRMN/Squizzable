import { Component, Inject, Renderer2, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
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
export class PlatillaMenuComponent implements OnInit {

  // Constructor adaptado con todas las inyecciones necesarias
  constructor(
    private login: AuthService,
    private router: Router,
    private conf: AuthService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) {}

  admin: string | null = null;
  items: MenuItem[] | undefined;
  vertical: MenuItem[] | undefined;
  vertical2: MenuItem[] | undefined;
  isDarkMode = false;
  loading: boolean = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    localStorage.setItem('darkMode', this.isDarkMode ? 'true' : 'false');

    this.loading = true;
    setTimeout(() => {
      this.loading = false
    }, 200);
    console.log("D/Tema cambiado")
  }

  // --- FUNCIÓN ADAPTADA Y COMPLETADA PARA APLICAR EL TEMA A TODO ---
  private applyTheme() {
    const themeClass = 'dk';
    const routerContainer = this.document.querySelector('.contenido-router') as HTMLElement;

    // Colores para el body
    const lightModeBodyBg = '#f8f9fa';
    const darkModeBodyBg = '#212529';

    // Colores para el contenedor del router
    const lightModeContainerBg = '#ffffff';
    const darkModeContainerBg = '#343a40';
    const lightModeContainerBorder = '#dee2e6';
    const darkModeContainerBorder = '#495057';

    if (this.isDarkMode) {
      // 1. Aplica la clase a <html> para los componentes de PrimeNG.
      this.renderer.addClass(this.document.documentElement, themeClass);
      // 2. Cambia el fondo del <body> directamente.
      this.renderer.setStyle(this.document.body, 'background-color', darkModeBodyBg);
      // 3. Cambia el fondo y borde del contenedor del router directamente.
      if (routerContainer) {
        this.renderer.setStyle(routerContainer, 'background-color', darkModeContainerBg);
        this.renderer.setStyle(routerContainer, 'border-color', darkModeContainerBorder);
      }
    } else {
      // 1. Quita la clase de <html>.
      this.renderer.removeClass(this.document.documentElement, themeClass);
      // 2. Restaura el fondo del <body>.
      this.renderer.setStyle(this.document.body, 'background-color', lightModeBodyBg);
      // 3. Restaura el fondo y borde del contenedor del router.
      if (routerContainer) {
        this.renderer.setStyle(routerContainer, 'background-color', lightModeContainerBg);
        this.renderer.setStyle(routerContainer, 'border-color', lightModeContainerBorder);
      }
    }
  }

  logOut() {
    this.login.logOff()
  }

  ngOnInit() {
    // Modo Oscuro - Aplicamos el tema guardado al iniciar
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.applyTheme(); // Llama a nuestra nueva función para aplicar el tema al cargar

    this.admin = localStorage.getItem('is_superuser');
    console.log("Admin: " + this.admin);
    this.items = [];
  
    this.vertical = [
        {
            label: 'Opciones',
            items: [
                { label: 'Módulos', icon: 'pi pi-plus', command: () => { this.router.navigate(['/Modulo']) } },
                { label: 'Progreso', icon: 'pi pi-search', command: () => { this.router.navigate(['/Progreso']) } },
                { label: 'Ranking General', icon: 'pi pi-cog', command: () => { this.router.navigate(['/RankingGeneral']) } },
                { label: 'Ranking Modular', icon: 'pi pi-cog', command: () => { this.router.navigate(['/RankingModular']) } },
            ]
        },
        {
            label: 'Administrador',
            items: [
                { label: 'Modulo', icon: 'pi pi-cog', routerLink: '/Modulos' },
                { label: 'Temas', icon: 'pi pi-cog', routerLink: '/Temas' },
                { label: 'Especialidad', icon: 'pi pi-sign-out', routerLink: '/Especialidades' },
                { label: 'Preguntas', icon: 'pi pi-sign-out', routerLink: '/Preguntas' },
                { label: 'Alternativas', icon: 'pi pi-sign-out', routerLink: '/Alternativas' },
            ]
        },
        {
            label: 'Sesion',
            items: [
                { label: 'Cuenta', icon: 'pi pi-cog' },
                { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => { this.logOut() } }
            ]
        }
    ];
    this.vertical2 = [
        {
            label: 'Opciones',
            items: [
                { label: 'Módulos', icon: 'pi pi-plus', command: () => { this.router.navigate(['/Modulo']) } },
                { label: 'Progreso', icon: 'pi pi-search', command: () => { this.router.navigate(['/Progreso']) } },
                { label: 'Ranking General', icon: 'pi pi-cog', command: () => { this.router.navigate(['/RankingGeneral']) } },
                { label: 'Ranking Modular', icon: 'pi pi-cog', command: () => { this.router.navigate(['/RankingModular']) } },
            ]
        },
        {
            label: 'Sesion',
            items: [
                { label: 'Cuenta', icon: 'pi pi-cog' },
                { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => { this.logOut() } }
            ]
        }
    ];
  }
}
