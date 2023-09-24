import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCarrinhoComponent } from './list-carrinho/list-carrinho.component';
import { HomeCarrinhoComponent } from './home-carrinho/home-carrinho.component';
import {RouterModule} from "@angular/router";
import {CarrinhoRoutes} from "./carrinho-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";


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
    MatIconModule
  ]
})
export class CarrinhoModule { }
