import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./core/home/home.component";
import {JogosRoutes} from "./pages/jogos/jogos-routing.module";
import {AutenticacaoRoutes} from "./arquitetura/autenticacao/autenticacao.routing";
import {AvaliacoesRoutes} from "./pages/avaliacoes/avaliacoes-routing.module";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [...JogosRoutes, ...AvaliacoesRoutes]
  },
  {
    path: "acesso",
    children: [
      ...AutenticacaoRoutes
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
