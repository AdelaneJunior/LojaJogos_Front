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
import {addBodyClass} from "@angular/cdk/schematics";
import {subscribeOn} from "rxjs";

@Component({
  selector: 'app-form-jogo',
  templateUrl: './form-jogo.component.html',
  styleUrls: ['./form-jogo.component.css']
})
export class FormJogoComponent {
  formGroup !: FormGroup;
  codigo!: number;
  paramCodigo: any
  private readonly BOTAO_ADICIONAR = "Adicionar";
  private readonly BOTAO_ALTERAR = "Alterar";
  botao: string = this.BOTAO_ADICIONAR;

  constructor
  (private formBuilder: FormBuilder,
   private _adapter: DateAdapter<any>,
   public jogoService: JogoControllerService,
   private dialog: MatDialog,
   private router: Router,
   private activatedRoute: ActivatedRoute) {

    this._adapter.setLocale('pt-br');
    this.createForm();
    this.preencheForm();
  }

  preencheForm() {

    this.paramCodigo = this.activatedRoute.snapshot.paramMap.get('codigo')

    if (this.paramCodigo) {

      this.codigo = parseInt(this.paramCodigo)

      console.log("Monta", this.paramCodigo)
      console.log("Codigo", this.codigo)

      if (this.codigo != null) {
        this.jogoService.obterPorId({id: this.codigo}).subscribe(
          retorno => {
            this.codigo = retorno.codigo;
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

    if (this.codigo != null) {
      this.jogoService.alterar({id: this.codigo, body: this.formGroup.value}).subscribe(
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
      this.jogoService.incluir({body: this.formGroup.value}).subscribe(
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
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  confirmarInclusao(jogoDto
                      :
                      JogoDto
  ) {
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

  confirmarAlteracao(jogoDto
                       :
                       JogoDto
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
}


