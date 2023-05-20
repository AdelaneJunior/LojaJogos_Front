import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./core/home/home.component";
import {JogosRoutes} from "./pages/jogos/jogos-routing.module";
import {FormJogoComponent} from "./pages/jogos/form-jogo/form-jogo.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [...JogosRoutes]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
