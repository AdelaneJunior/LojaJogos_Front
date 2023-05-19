import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeJogosComponent } from './home-jogos/home-jogos.component';
import {JogosRoutes} from "./jogos-routing.module";
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ListaJogosComponent } from './lista-jogos/lista-jogos.component';
import {MatTableModule} from '@angular/material/table';
import { FormJogoComponent } from './form-jogo/form-jogo.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [
    HomeJogosComponent,
    ListaJogosComponent,
    FormJogoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(JogosRoutes),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule

  ]
})
export class JogosModule { }
