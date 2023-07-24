import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {JogoDto} from "../../../api/models/jogo-dto";
import {JogoControllerService} from "../../../api/services/jogo-controller.service";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-lista-jogos',
  templateUrl: './lista-jogos.component.html',
  styleUrls: ['./lista-jogos.component.css']
})
export class ListaJogosComponent implements OnInit {

  colunasMostrar = [ 'codigo','caminhoImagem', 'nomeJogo', 'categoria', 'desenvolvedora', 'dataLancamento', 'valor', 'nota', 'acao'];
  jogoListaDataSource: MatTableDataSource<JogoDto> = new MatTableDataSource<JogoDto>([]);
  listaImagemJogo:MatTableDataSource<JogoDto> = new MatTableDataSource<JogoDto>([]);

  constructor(
    public jogoService: JogoControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) {

  }

  ngOnInit(): void {
    this.buscarDados();
  }

  private buscarDados() {
    this.jogoService.jogoControllerListAll().subscribe(data => {
      this.jogoListaDataSource.data = data;
      this.listaImagemJogo.data = data;
      const jogoDTO = data;
      console.log(jogoDTO[0]);
    })
  }

  excluir(jogoDto: JogoDto) {
    console.log("Removido", jogoDto.codigo);
    this.jogoService.jogoControllerRemover({id: jogoDto.codigo || 0})
      .subscribe(retorno => {
          this.buscarDados();
          this.showMensagemSimples("Excluído com sucesso ", 5000);
          console.log("Exlcusão:", retorno);
        }, error => {
          if (error.status === 404) {
            this.showMensagemSimples("jogo não existe mais")
          } else {
            this.showMensagemSimples("Erro ao excluir");
            console.log("Erro:", error);
          }
        }
      )

  }

  confirmarExcluir(jogoDto: JogoDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Confirmar?',
        mensagem: `A exclusão de: ${jogoDto.nomeJogo}?`,
        textoBotoes: {
          ok: 'Sim',
          cancel: 'Cancelar',
        },
        dado: jogoDto
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
      if (confirmed?.resultado) {
        this.excluir(confirmed.dado);
        this.buscarDados();
      }
    });
  }

  showMensagemSimples(mensagem: string, duracao: number = 2000) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: duracao,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  //
  // navegarParaAlteracao(codigo:number) {
  //   console.log("JOGO:", codigo)
  //   this.router.navigate(['/home/jogos/novo'],{ queryParams:{
  //         codigo: codigo}
  //     })
  // }

}
