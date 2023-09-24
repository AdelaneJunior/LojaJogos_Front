import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {CarrinhoControllerService} from "../../../api/services/carrinho-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {CarrinhoDto} from "../../../api/models/carrinho-dto";
import {JogoCarrinhoDto} from "../../../api/models/jogo-carrinho-dto";

@Component({
  selector: 'app-list-carrinho',
  templateUrl: './list-carrinho.component.html',
  styleUrls: ['./list-carrinho.component.css']
})
export class ListCarrinhoComponent implements OnInit{

  colunasAMostrar : string[] = ['nomeJogo', 'preco', 'quantidade'];

  carrinhoListaDataSource: MatTableDataSource<JogoCarrinhoDto> =
    new MatTableDataSource<JogoCarrinhoDto>([])

  carrinhoList : CarrinhoDto[] = [];

  constructor(
    public carrinhoService : CarrinhoControllerService,
    private dialog : MatDialog,
    private snackBar : MatSnackBar,
    private router : Router) {}

  ngOnInit(): void {
    this.buscarDados();
  }


  private buscarDados() {
    this.carrinhoService.carrinhoControllerListAll().subscribe( data => {
        this.carrinhoList = data;
      }
    )
    console.log(this.carrinhoList)
  }
}
