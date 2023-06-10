import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AvaliacoesRoutes} from './avaliacoes-routing.module';
import {FormAvaliacaoComponent} from "./form-avaliacao/form-avaliacao.component";
import {HomeAvaliacaoComponent} from "./home-avaliacao/home-avaliacao.component";
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { ListaAvaliacaoComponent } from './lista-avaliacao/lista-avaliacao.component';
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";



@NgModule({
  declarations: [
    FormAvaliacaoComponent,
    HomeAvaliacaoComponent,
    ListaAvaliacaoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AvaliacoesRoutes),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatPaginatorModule,
  ]
})
export class AvaliacoesModule { }
