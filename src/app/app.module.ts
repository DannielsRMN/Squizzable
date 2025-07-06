import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Estilo General
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Material from '@primeng/themes/material';
import { providePrimeNG } from 'primeng/config';

// Menu
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Menubar } from 'primeng/menubar';

// Tabla
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

// Componente
import { IMAGE_CONFIG } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TokenInterceptor } from '../services/token.interceptor';
import { AlternativaComponent } from './alternativa/alternativa.component';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { ModulosComponent } from './modulos/modulos.component';
import { CRUDEspecializacionesComponent } from './crud-especializaciones/crud-especializaciones.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { CrudModulosComponent } from './crud-modulos/crud-modulos.component';
import { ProgresoListComponent } from './progreso-list/progreso-list.component';
import { CargoComponent } from './cargo/cargo.component';
import { TemaComponent } from './tema/tema.component';

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
    CargoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    CardModule,
    TableModule,
    SliderModule,
    FormsModule,
    BrowserAnimationsModule,
    MenubarModule,
    PanelMenuModule,
    ReactiveFormsModule,
    MenuModule,
    HttpClientModule,
    ToastModule,
    TagModule,
    SelectModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: IMAGE_CONFIG,
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
        }      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
