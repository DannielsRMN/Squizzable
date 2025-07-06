import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../services/auth.guard';
import { ModulosComponent } from './modulos/modulos.component';
import { CRUDEspecializacionesComponent } from './crud-especializaciones/crud-especializaciones.component';
import { CrudModulosComponent } from './crud-modulos/crud-modulos.component';
import { PreguntaComponent } from './pregunta/pregunta.component';
import { AlternativaComponent } from './alternativa/alternativa.component';
import { ProgresoListComponent } from './progreso-list/progreso-list.component';
import { TemaComponent } from './tema/tema.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },

  { path: "inicio", component: InicioComponent, canActivate: [AuthGuard] },
  { path: "Modulo", component: ModulosComponent, canActivate: [AuthGuard] },
  { path: "Progreso", component: ProgresoListComponent, canActivate: [AuthGuard] },

  { path: "Especialidades", component: CRUDEspecializacionesComponent, canActivate: [AuthGuard] },
  { path: "Modulos", component: CrudModulosComponent, canActivate: [AuthGuard] },
  { path: "Preguntas", component: PreguntaComponent, canActivate: [AuthGuard] },
  { path: "Alternativas", component: AlternativaComponent, canActivate: [AuthGuard] },
  { path: "Temas", component: TemaComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
