import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../services/auth.guard';
import { ModulosComponent } from './modulos/modulos.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },

  { path: "inicio", component: InicioComponent, canActivate: [AuthGuard] },
  { path: "modulo", component: ModulosComponent, canActivate: [AuthGuard] }, // Protege esta ruta
  { path: "Registrar-Usuario", component: RegistrarUsuarioComponent, canActivate: [AuthGuard] }, // Protege esta ruta

  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  { path: '**', redirectTo: 'inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
