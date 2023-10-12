import {Component} from '@angular/core';

@Component({
  selector: 'app-home-principal',
  templateUrl: './home-principal.component.html',
  styleUrls: ['./home-principal.component.css']
})
export class HomePrincipalComponent{
  public slides: any[] = [
    {
      descricao:'OS MELHORES JOGOS',
      src: 'https://i.redd.it/4cgg201hvk151.jpg'
    },
    {
      descricao:'COMPRE JOGOS',
      src: 'https://media.tenor.com/tzJLT_QujbYAAAAd/hollow-knight.gif'
    },
    {
      descricao:'AVALIE',
      src: 'https://uploads.jovemnerd.com.br/wp-content/uploads/2022/02/mod-god-of-war-cj-barney.jpg'
    },
    {
      descricao:'SITE 100% ATUALIZADO E FUNCIONANDO',
      src: 'https://i.ytimg.com/vi/glza21PGhfQ/maxresdefault.jpg'
    }
  ];
}
