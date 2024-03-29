import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {JogoControllerService} from "../../../api/services/jogo-controller.service";
import {MatDialog} from "@angular/material/dialog";
import {JogoDto} from "../../../api/models/jogo-dto";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ImagemControllerService} from "../../../api/services/imagem-controller.service";
import {SecurityService} from "../../../arquitetura/security/security.service";

@Component({
  selector: 'app-form-jogo',
  templateUrl: './form-jogo.component.html',
  styleUrls: ['./form-jogo.component.css']
})
export class FormJogoComponent {
  formGroup !: FormGroup;
  codigo!: number;
  paramCodigo: any
  codigoImagem: number = 0;
  file!: File;
  private readonly BOTAO_ADICIONAR = "Adicionar Novo Jogo";
  botao: string = this.BOTAO_ADICIONAR;
  private readonly BOTAO_ALTERAR = "Alterar Jogo";
  fileName !: String;
  codigoImagemAntiga!: number;

  constructor
  (private formBuilder: FormBuilder,
   private _adapter: DateAdapter<any>,
   public jogoService: JogoControllerService,
   public imagemService: ImagemControllerService,
   public securityService: SecurityService,
   private dialog: MatDialog,
   private router: Router,
   private activatedRoute: ActivatedRoute) {

    this._adapter.setLocale('pt-br');
    this.createForm();
    this.preencheForm();
  }

  ngOnInit() {
    if (!this.securityService.hasRoles(["ROLE_ADMIN"])) {
      this.router.navigate(['/']);
    }
  }

  preencheForm() {

    this.paramCodigo = this.activatedRoute.snapshot.paramMap.get('codigo')

    if (this.paramCodigo) {

      this.codigo = parseInt(this.paramCodigo)

      console.log("Monta", this.paramCodigo)
      console.log("Codigo", this.codigo)

      if (this.codigo != null) {
        this.jogoService.jogoControllerObterPorId({id: this.codigo}).subscribe(
          retorno => {
            this.codigo = retorno.codigo;
            this.codigoImagemAntiga = retorno.codigoImagem;
            this.codigoImagem = this.codigoImagemAntiga;
            this.botao = this.BOTAO_ALTERAR;
            console.log("Retorno", retorno)
            this.formGroup.patchValue(retorno);
            this.fileName = retorno.nomeImagem;
          }
        )
      }
    }
  }

  createForm() {

    this.formGroup = this.formBuilder.group({

      nome: [null, Validators.required],
      desenvolvedora: [null, Validators.required],
      categoria: [null, Validators.required],
      valor: [null, Validators.required],
      dataLancamento: [null, Validators.required],
    });

    console.log("Dados:", this.formGroup.value);

  }

  onSubmit() {
    console.log("Dados: ", this.formGroup.value);

    if (this.file || (this.codigoImagemAntiga === this.codigoImagem)) {
      let blob: Blob = new Blob()
      blob = this.file;
      console.log("BLOBL", blob)

      if (this.codigoImagemAntiga) {

        if (this.codigoImagemAntiga != this.codigoImagem) {
          console.log("Alterar mudando imagem")
          this.imagemService.imagemControllerUploadImagem({body: {imagemASalvar: blob}})
            .subscribe(retorno => {
              console.log(retorno)
              this.codigoImagem = parseInt(retorno);
                if (this.codigo != null) {
                  let jogoDTO: JogoDto = this.formGroup.value;
                  jogoDTO.codigoImagem = this.codigoImagem;
                  this.jogoService.jogoControllerAlterar({id: this.codigo, body: jogoDTO,}).subscribe(
                    retorno => {
                      console.log("alterou:", retorno);
                      this.imagemService.imagemControllerRemover({id: this.codigoImagemAntiga}).subscribe(retorno1 =>{
                        this.confirmarAlteracao(retorno);
                      })
                    },
                    error => {
                      console.log("Deu ruim:", +error);
                      alert("Não incluido")
                    }
                  )
                }
            })
        } else if (this.codigoImagemAntiga === this.codigoImagem) {

          console.log("Alterar sem mudar imagem")
          if (this.codigo != null) {
            let jogoDTO: JogoDto = this.formGroup.value;
            jogoDTO.codigoImagem = this.codigoImagem;
            this.jogoService.jogoControllerAlterar({id: this.codigo, body: jogoDTO,}).subscribe(
              retorno => {
                console.log("alterou:", retorno);
                this.confirmarAlteracao(retorno);
              },
              error => {
                console.log("Deu ruim:", +error);
                alert("Não incluido")
              }
            )
          }
        }
      } else {
        console.log("incluir")
        this.imagemService.imagemControllerUploadImagem({body: {imagemASalvar: blob}})
          .subscribe(retorno => {
            console.log(retorno)
            this.codigoImagem = parseInt(retorno);
              let jogoDTO: JogoDto = this.formGroup.value;
              console.log("JOGO A SER INCLUIDO: ", this.formGroup.value)
              jogoDTO.codigoImagem = this.codigoImagem;
              this.jogoService.jogoControllerIncluir({body: jogoDTO}).subscribe(
                retorno => {
                  console.log("Funcionou:", retorno);
                  this.confirmarInclusao(retorno);
                },
                error => {
                  console.log("Deu ruim:", +error);
                  alert("Não incluido")
                }
              )

          })
      }
    } else {
      alert("O jogo não tem imagem")
    }


  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  confirmarInclusao(jogoDto: JogoDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Mensagem!!!',
        mensagem: `Inclusão de: ${jogoDto.nome} (ID: ${jogoDto.codigo}) realiza com sucesso!`,
        textoBotoes: {
          ok: 'ok',
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
      if (confirmed?.resultado) {
        this.navegarParaLista();
      }
    });
  }

  confirmarAlteracao(jogoDto: JogoDto
  ) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Mensagem!!!',
        mensagem: `Alteração de: ${jogoDto.nome} (ID: ${jogoDto.codigo}) realiza com sucesso!`,
        textoBotoes: {
          ok: 'ok',
        },
      },
    });
    dialogRef.afterClosed().subscribe((confirmed: ConfirmationDialogResult) => {
      if (confirmed?.resultado) {
        this.navegarParaLista();
      }
    });
  }

  navegarParaLista() {
    this.router.navigate(['/jogos'])
  }

  onFilechange(event: any) {
    this.file = event.target.files[0]
    this.fileName = this.file.name
    console.log(this.file)
    this.codigoImagem = 0;
  }

}


