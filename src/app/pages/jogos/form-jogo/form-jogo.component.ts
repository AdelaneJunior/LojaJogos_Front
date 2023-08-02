import {Component, OnInit} from '@angular/core';
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
  codigoImagem:number = 0;
  private readonly BOTAO_ADICIONAR = "Adicionar";
  private readonly BOTAO_ALTERAR = "Alterar";
  botao: string = this.BOTAO_ADICIONAR;
  file!: File;
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

  ngOnInit(){
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
            this.codigoImagem = retorno.codigoImagem;
            this.botao = this.BOTAO_ALTERAR;
            console.log("Retorno", retorno)
            this.formGroup.patchValue(retorno);
          }
        )
      }
    }
  }

  createForm() {

    this.formGroup = this.formBuilder.group({

      nomeJogo: [null, Validators.required],
      desenvolvedora: [null, Validators.required],
      categoria: [null, Validators.required],
      valor: [null, Validators.required],
      dataLancamento: [null, Validators.required],
    });

    console.log("Dados:", this.formGroup.value);

  }

  onSubmit() {
    console.log("Dados: ", this.formGroup.value);

    if(this.codigoImagem != 0) {
      if (this.codigo != null) {
        let jogoDTO:JogoDto = this.formGroup.value;
        jogoDTO.codigoImagem = this.codigoImagem;
        this.jogoService.jogoControllerAlterar({id: this.codigo, body: this.formGroup.value,}).subscribe(
          retorno => {
            console.log("alterou:", retorno);
            this.confirmarAlteracao(retorno);
          },
          error => {
            console.log("Deu ruim:", +error);
            alert("Não incluido")
          }
        )
      } else {
        let jogoDTO: JogoDto = this.formGroup.value;
        console.log(this.codigoImagem)
        jogoDTO.codigoImagem = this.codigoImagem;
        this.jogoService.jogoControllerIncluir({body: this.formGroup.value}).subscribe(
          retorno => {
            console.log("Funcionou:", retorno);
            this.confirmarInclusao(retorno);
          },
          error => {
            console.log("Deu ruim:", +error);
            alert("Não incluido")
          }
        )
      }
    }else{
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
        mensagem: `Inclusão de: ${jogoDto.nomeJogo} (ID: ${jogoDto.codigo}) realiza com sucesso!`,
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
        mensagem: `Alteração de: ${jogoDto.nomeJogo} (ID: ${jogoDto.codigo}) realiza com sucesso!`,
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
    console.log(this.file)

  }

  upload() {
    if (this.file) {

      let blob: Blob = new Blob()
      blob = this.file;
      console.log(blob)
      this.imagemService.imagemControllerUploadImagem({body:{imagemASalvar: blob} })
    .subscribe(retorno => {
      console.log(retorno)
      this.codigoImagem = parseInt(retorno);

      const dialogRef = this.dialog.open(ConfirmationDialog, {
        data: {
          titulo: 'Imagem',
          mensagem: `Upload de imagem realizado com sucesso. ID: ${this.codigoImagem}`,
          textoBotoes: {
            ok: 'ok',
          },
        },
      });

      })
    } else {
      alert("Please select a file first")
    }
  }
}


