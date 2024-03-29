import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CarrinhoControllerService} from "../../../api/services/carrinho-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {CarrinhoDto} from "../../../api/models/carrinho-dto";
import {JogoCarrinhoDto} from "../../../api/models/jogo-carrinho-dto";
import {SecurityService} from "../../../arquitetura/security/security.service";

@Component({
  selector: 'app-list-carrinho',
  templateUrl: './list-carrinho.component.html',
  styleUrls: ['./list-carrinho.component.css']
})
export class ListCarrinhoComponent implements OnInit{

  colunasAMostrar : string[] = ['dadosJogo','dadosCompra','quantidade', 'precoFinal', 'acao'];
  jogoCarrinhoListaDataSource: MatTableDataSource<JogoCarrinhoDto> =
    new MatTableDataSource<JogoCarrinhoDto>([])
  carrinhoDto !: CarrinhoDto;
  imagensJogos:String[] = [];
  listaJogos : Array<JogoCarrinhoDto> = [];


  constructor(
    public carrinhoService : CarrinhoControllerService,
    public securityService: SecurityService,
    private dialog : MatDialog,
    private snackBar : MatSnackBar,
    private router : Router,
    private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.iniciarCarrinho();
  }


  private iniciarCarrinho() {

    this.carrinhoDto = this.route.snapshot.data['carrinho'];
    console.log("JOGOS DESSE CARRINHO",this.carrinhoDto)

    this.listaJogos = this.carrinhoDto.jogoCarrinho || [];
    console.log("SEI LA", this.listaJogos)

    if(this.carrinhoDto.jogoCarrinho){
        this.carrinhoDto.jogoCarrinho.forEach(jogoCarrinho =>{

          this.imagensJogos.push(jogoCarrinho.caminhoImagemJogo || "")

        })
      console.log("imagens",this.imagensJogos)
    }

  }

  retirarJogoDoCarrinho(posicaoRemover:number){
    if(this.carrinhoDto.jogoCarrinho) {
      this.carrinhoDto.jogoCarrinho.splice(posicaoRemover,1)
      this.carrinhoService.carrinhoControllerAlterar(
        {id:this.carrinhoDto.codigo||0, body:this.carrinhoDto})
        .subscribe(retorno =>{
          this.carrinhoDto = retorno;
          this.listaJogos = this.carrinhoDto.jogoCarrinho || [];
          console.log("caro alterado ",this.carrinhoDto)

        })
    }
  }

}
