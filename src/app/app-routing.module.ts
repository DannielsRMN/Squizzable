import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../services/auth.guard';
import { ModulosComponent } from './modulos/modulos.component';
import { CRUDEspecializacionesComponent } from './crud-especializaciones/crud-especializaciones.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },

  { path: "inicio", component: InicioComponent, canActivate: [AuthGuard] },
  { path: "Modulo", component: ModulosComponent, canActivate: [AuthGuard] },
  { path: "Especialidad", component: CRUDEspecializacionesComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
