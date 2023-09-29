import {Routes} from '@angular/router';
import {HomeCarrinhoComponent} from "./home-carrinho/home-carrinho.component";
import {ListCarrinhoComponent} from "./list-carrinho/list-carrinho.component";
import {CarrinhoResolve} from "./shared/carrinho-resolve.service";

const routes: Routes = [];

export const CarrinhoRoutes: Routes = [


  {
    path:"carrinho",
    component: HomeCarrinhoComponent,
    children:[
      {
        path:"",
        component:ListCarrinhoComponent,
        resolve:{
          carrinho : CarrinhoResolve
        }
      }
    ]
  }
];
