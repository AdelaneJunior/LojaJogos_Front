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
import {SecurityService} from "../../../arquitetura/security/security.service";
import {CarrinhoControllerService} from "../../../api/services/carrinho-controller.service";
import {CarrinhoDto} from "../../../api/models/carrinho-dto";
import {JogoCarrinhoDto} from "../../../api/models/jogo-carrinho-dto";
import {UsuarioDto} from "../../../api/models/usuario-dto";
import {UsuarioControllerService} from "../../../api/services/usuario-controller.service";

@Component({
  selector: 'app-lista-jogos',
  templateUrl: './lista-jogos.component.html',
  styleUrls: ['./lista-jogos.component.css']
})
export class ListaJogosComponent implements OnInit {

  colunasMostrar = ['codigo', 'caminhoImagem', 'nomeJogo', 'categoria', 'desenvolvedora', 'dataLancamento', 'valor', 'acao'];
  jogoListaDataSource: MatTableDataSource<JogoDto> = new MatTableDataSource<JogoDto>([]);
  listaImagemJogo: MatTableDataSource<JogoDto> = new MatTableDataSource<JogoDto>([]);
  admin: boolean = false;
  usuarioDto !: UsuarioDto;
  carrinhoDto !: CarrinhoDto;

  constructor(
    public securityService: SecurityService,
    public jogoService: JogoControllerService,
    public usuarioService : UsuarioControllerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    public carrinhoService: CarrinhoControllerService) {

  }

  ngOnInit(): void {
    this.admin = !this.securityService.hasRoles(['ROLE_ADMIN']);
    this.montaCarrinho()
    this.buscarDados();
  }

  private buscarDados() {
    // @ts-ignore
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

  adicionarAoCarrinho(jogo: JogoDto) {

    console.log("CARRINHO: ", this.carrinhoDto)

    const jogoCarrinhoDto : JogoCarrinhoDto = new class implements JogoCarrinhoDto {}
    jogoCarrinhoDto.jogoCodigo = jogo.codigo;
    jogoCarrinhoDto.quantidade = 1;
    jogoCarrinhoDto.desconto = 0;

    this.carrinhoDto.jogos = [];
    this.carrinhoDto.jogos.push(jogoCarrinhoDto);

    this.carrinhoDto.precoFinal = <number> jogo.valor * jogoCarrinhoDto.quantidade;

    this.carrinhoService.carrinhoControllerIncluir({modeloDTO:this.carrinhoDto}).subscribe(
      retorno => {
        console.log("Funcionou:", retorno)},
      error => {
        console.log("ruim: ", +error)
      }
    );

  }

  private montaCarrinho() {

    let codigo:number = <number>this.securityService.credential.user?.id;

    console.log("Codigo", codigo)

    this.usuarioService.usuarioControllerObterPorId({id: codigo}).subscribe(
      retorno =>{
        this.usuarioDto = retorno;
        console.log("su", this.usuarioDto)
        codigo =  <number>this.usuarioDto.carrinhoCodigo;
        console.log("Codigo do caro", codigo)
        this.carrinhoService.carrinhoControllerObterPorId({id:codigo}).subscribe(
          retorno =>{
            this.carrinhoDto = retorno
          })
      }
    )
  }



}
