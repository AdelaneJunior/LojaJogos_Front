import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AvaliacaoDto} from "../../../api/models/avaliacao-dto";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AvaliacaoControllerService} from "../../../api/services/avaliacao-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-lista-avalicao-detalhes',
  templateUrl: './lista-avalicao-detalhes.component.html',
  styleUrls: ['./lista-avalicao-detalhes.component.css']
})
export class ListaAvalicaoDetalhesComponent {

  jogoSeq!:number
  paramJogoSeq:any
  displayedColumns: string[] = ['nomeJogo', 'nota', 'nomeUsuario', 'descricao'];
  avalicaoListaDataSource: MatTableDataSource<AvaliacaoDto> = new MatTableDataSource<AvaliacaoDto>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public avalicaoService: AvaliacaoControllerService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.buscarDados();

  }

  ngAfterViewInit() {
    this.avalicaoListaDataSource.paginator = this.paginator;
    this.avalicaoListaDataSource.sort = this.sort;
  }

  private buscarDados() {

    this.paramJogoSeq = this.activatedRoute.snapshot.paramMap.get('jogoSeq')
    this.jogoSeq = parseInt(this.paramJogoSeq)
    this.avalicaoService.avaliacaoControllerObterListaAvaliacaoPorJogo({jogoSeq:this.jogoSeq}).subscribe(data => {
      this.avalicaoListaDataSource.data = data;
    })

  }


}
