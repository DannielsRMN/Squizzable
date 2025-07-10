import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// --- CONFIGURACIÓN DE PRIMENG Y ANGULAR ---
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeng/themes/material';
import { IMAGE_CONFIG, CommonModule } from '@angular/common'; // CommonModule para el pipe 'date'

// --- MÓDULOS DE PRIMENG (TODOS LOS NECESARIOS) ---
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

// --- COMPONENTES Y SERVICIOS DE LA APP ---
import { AppComponent } from './app.component';
import { TokenInterceptor } from '../services/token.interceptor';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { ModulosComponent } from './modulos/modulos.component';
import { CRUDEspecializacionesComponent } from './crud-especializaciones/crud-especializaciones.component';
import { CrudModulosComponent } from './crud-modulos/crud-modulos.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { AlternativaComponent } from './alternativa/alternativa.component';
import { ProgresoListComponent } from './progreso-list/progreso-list.component';
import { TemaComponent } from './tema/tema.component';
import { RankingGeneralComponent } from './ranking-general/ranking-general.component';
import { RankingModularComponent } from './ranking-modular/ranking-modular.component';
import { PlatillaMenuComponent } from './platilla-menu/platilla-menu.component';
import { TemasModuloComponent } from './temas-modulo/temas-modulo.component';

// --- NUEVOS COMPONENTES DEL QUIZZ ---
import { SeleccionComponent } from './seleccion/seleccion.component';
import { QuizzRespComponent } from './quizz-resp/quizz-resp.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    CRUDEspecializacionesComponent,
    ModulosComponent,
    TemaComponent,
    PreguntaComponent,
    AlternativaComponent,
    CrudModulosComponent,
    ProgresoListComponent,
    RankingGeneralComponent,
    RankingModularComponent,
    PlatillaMenuComponent,
    TemasModuloComponent,
    // --- AÑADIMOS LOS NUEVOS COMPONENTES A LAS DECLARACIONES ---
    SeleccionComponent,
    QuizzRespComponent
  ],
  imports: [
    // Módulos de Angular
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule, // Necesario para directivas como *ngIf, *ngFor y pipes como 'date'

    // Módulos de PrimeNG (TODOS los que necesitas)
    ButtonModule,
    CardModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    MenuModule,
    MenubarModule,
    PanelMenuModule,
    TableModule,
    TagModule,
    ToastModule,
    TooltipModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true
      }
    },
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Material,
        options: {
          darkModeSelector: '.dk'
        }
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
