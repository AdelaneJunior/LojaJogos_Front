import {Routes} from '@angular/router';
import {HomeAvaliacaoComponent} from "./home-avaliacao/home-avaliacao.component";
import {FormAvaliacaoComponent} from "./form-avaliacao/form-avaliacao.component";
import {ListaAvaliacaoComponent} from "./lista-avaliacao/lista-avaliacao.component";
import {ListaAvalicaoDetalhesComponent} from "./lista-avalicao-detalhes/lista-avalicao-detalhes.component";

const routes: Routes = [];
export const AvaliacoesRoutes: Routes = [

  {
    path: "avaliacao",
    component: HomeAvaliacaoComponent,
    children: [
      {
        path: "",
        component: ListaAvaliacaoComponent
      },
      {
        path: "nova",
        component: FormAvaliacaoComponent
      },
      {
        path: ":jogoSeq",
        component: ListaAvalicaoDetalhesComponent
      }]
  }
]
