import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeJogosComponent} from "./home-jogos/home-jogos.component";
import {ListaJogosComponent} from "./lista-jogos/lista-jogos.component";
import {FormJogoComponent} from "./form-jogo/form-jogo.component";
import {FormAvaliacaoComponent} from "../avaliacoes/form-avaliacao/form-avaliacao.component";
import {HomeAvaliacaoComponent} from "../avaliacoes/home-avaliacao/home-avaliacao.component";
import {CarrinhoResolve} from "../carrinho/shared/carrinho-resolve.service";

const routes: Routes = [];

export const JogosRoutes: Routes = [

  {
    path:"jogos",
    component: HomeJogosComponent,
    children:[
      {
        path: "",
        component: ListaJogosComponent,
        resolve:{
          carrinho : CarrinhoResolve
        }
      },
      {
        path: "novo",
        component: FormJogoComponent
      },
      {
        path: ":codigo",
        component: FormJogoComponent
      }
    ]
  },
  {
    path:"avaliacao/nova",
    component:HomeAvaliacaoComponent,
    children:[{
      path: ":codigo",
      component: FormAvaliacaoComponent
    }]
  }

];
