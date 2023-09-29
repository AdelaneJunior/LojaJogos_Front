import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ListCarrinhoComponent} from './list-carrinho/list-carrinho.component';
import {HomeCarrinhoComponent} from './home-carrinho/home-carrinho.component';
import {RouterModule} from "@angular/router";
import {CarrinhoRoutes} from "./carrinho-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {CarrinhoResolve} from "./shared/carrinho-resolve.service";
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    ListCarrinhoComponent,
    HomeCarrinhoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CarrinhoRoutes),
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule
  ],
  providers: [
    CarrinhoResolve
  ]
})
export class CarrinhoModule { }
