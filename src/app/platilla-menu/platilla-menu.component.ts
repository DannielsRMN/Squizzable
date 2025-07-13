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


  private applyTheme() {
    const themeClass = 'dk';
    const routerContainer = this.document.querySelector('.contenido-router') as HTMLElement;
    const lightModeBodyBg = '#f8f9fa';
    const darkModeBodyBg = '#212529';
    const lightModeContainerBg = '#ffffff';
    const darkModeContainerBg = '#343a40';
    const lightModeContainerBorder = '#dee2e6';
    const darkModeContainerBorder = '#495057';

    if (this.isDarkMode) {
      this.renderer.addClass(this.document.documentElement, themeClass);
      this.renderer.setStyle(this.document.body, 'background-color', darkModeBodyBg);
      if (routerContainer) {
        this.renderer.setStyle(routerContainer, 'background-color', darkModeContainerBg);
        this.renderer.setStyle(routerContainer, 'border-color', darkModeContainerBorder);
      }
    } else {
      this.renderer.removeClass(this.document.documentElement, themeClass);
      this.renderer.setStyle(this.document.body, 'background-color', lightModeBodyBg);
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
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
    this.applyTheme(); 

    this.admin = localStorage.getItem('is_superuser');
    console.log("Admin: " + this.admin);
    this.items = [];
  
    this.vertical = [
        {
            label: 'Opciones',
            items: [
                { label: 'Módulos', icon: 'pi pi-question', command: () => { this.router.navigate(['/Modulo']) } },
                { label: 'Ranking General', icon: 'pi pi-star', command: () => { this.router.navigate(['/RankingGeneral']) } },
                { label: 'Ranking Modular', icon: 'pi pi-star-fill', command: () => { this.router.navigate(['/RankingModular']) } },
            ]
        },
        {
            label: 'Administrador',
            items: [
                { label: 'Modulo', icon: 'pi pi-cog', routerLink: '/Modulos' },
                { label: 'Temas', icon: 'pi pi-cog', routerLink: '/Temas' },
                { label: 'Especialidad', icon: 'pi pi-cog', routerLink: '/Especialidades' },
                { label: 'Preguntas', icon: 'pi pi-cog', routerLink: '/Preguntas' },
                { label: 'Alternativas', icon: 'pi pi-cog', routerLink: '/Alternativas' },
            ]
        },
        {
            label: 'Sesion',
            items: [
                { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => { this.logOut() } }
            ]
        }
    ];
    this.vertical2 = [
        {
            label: 'Opciones',
            items: [
                { label: 'Módulos', icon: 'pi pi-question', command: () => { this.router.navigate(['/Modulo']) } },
                { label: 'Ranking General', icon: 'pi pi-star', command: () => { this.router.navigate(['/RankingGeneral']) } },
                { label: 'Ranking Modular', icon: 'pi pi-star-fill', command: () => { this.router.navigate(['/RankingModular']) } },
            ]
        },
        {
            label: 'Sesion',
            items: [
                { label: 'Cerrar Sesión', icon: 'pi pi-sign-out', command: () => { this.logOut() } }
            ]
        }
    ];
  }
}
