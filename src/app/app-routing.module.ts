import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./core/home/home.component";
import {JogosRoutes} from "./pages/jogos/jogos-routing.module";
import {AutenticacaoRoutes} from "./arquitetura/autenticacao/autenticacao.routing";
import {AvaliacoesRoutes} from "./pages/avaliacoes/avaliacoes-routing.module";
import {UsuarioInterfaceRoutes} from "./pages/usuario-interface/usuario-interface-routing.module";
import {CarrinhoRoutes} from "./pages/carrinho/carrinho-routing.module";
import {SecurityGuard} from "./arquitetura/security/security.guard";
import {HomePrincipalComponent} from "./pages/home-principal/home-principal.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [...JogosRoutes, ...AvaliacoesRoutes, ...CarrinhoRoutes,
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        component: HomePrincipalComponent
      }],
    canActivate: [SecurityGuard],
    data: {security: {roles: ['ROLE_USER', 'ROLE_ADMIN']}}
  },
  {
    path: "acesso",
    children: [
      ...AutenticacaoRoutes
    ]

  },
  {
    path:"cadastro",
    children:[
      ...UsuarioInterfaceRoutes
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
