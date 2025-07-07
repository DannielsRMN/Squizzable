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
import { RankingGeneralComponent } from './ranking-general/ranking-general.component';
import { RankingModularComponent } from './ranking-modular/ranking-modular.component';
import { PlatillaMenuComponent } from './platilla-menu/platilla-menu.component';
import { TemasModuloComponent } from './temas-modulo/temas-modulo.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },

  { path: "", component: PlatillaMenuComponent, canActivate: [AuthGuard], children: [
    { path: "Inicio", component: InicioComponent},
    { path: "Modulo", component: ModulosComponent},
    { path: "Progreso", component: ProgresoListComponent},
    { path: "RankingGeneral", component: RankingGeneralComponent},
    { path: "RankingModular", component: RankingModularComponent},


    { path: "TemasModulo", component: TemasModuloComponent},


    { path: "Especialidades", component: CRUDEspecializacionesComponent},
    { path: "Modulos", component: CrudModulosComponent},
    { path: "Preguntas", component: PreguntaComponent},
    { path: "Alternativas", component: AlternativaComponent},
    { path: "Temas", component: TemaComponent},

    { path: '', redirectTo: 'Inicio', pathMatch: 'full' },
  ]},

  { path: '', redirectTo: 'Inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
