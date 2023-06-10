import {Component, OnInit} from '@angular/core';
import {ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {AvaliacaoDto} from "../../../api/models/avaliacao-dto";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AvaliacaoControllerService} from "../../../api/services/avaliacao-controller.service";

@Component({
  selector: 'app-lista-avaliacao',
  templateUrl: './lista-avaliacao.component.html',
  styleUrls: ['./lista-avaliacao.component.css']
})
export class ListaAvaliacaoComponent implements OnInit {


  displayedColumns: string[] = ['nomeJogo', 'nota', 'descricao'];
  avalicaoListaSataSource: MatTableDataSource<AvaliacaoDto> = new MatTableDataSource<AvaliacaoDto>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public avalicaoService: AvaliacaoControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) {

  }

  ngOnInit(): void {
    this.buscarDados();
  }
  ngAfterViewInit() {
    this.avalicaoListaSataSource.paginator = this.paginator;
    this.avalicaoListaSataSource.sort = this.sort;
  }

  private buscarDados() {
    this.avalicaoService.listAll1().subscribe(data => {
      this.avalicaoListaSataSource.data = data;
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.avalicaoListaSataSource.filter = filterValue.trim().toLowerCase();

    if (this.avalicaoListaSataSource.paginator) {
      this.avalicaoListaSataSource.paginator.firstPage();
    }
  }
}
