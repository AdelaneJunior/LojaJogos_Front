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
export class FormJogoComponent implements OnInit {
  formGroup !: FormGroup;
  jogoDTO!: JogoDto;
  montaJogo: any
  botao:string = "Adicionar";

  constructor
  (private formBuilder: FormBuilder,
   private _adapter: DateAdapter<any>,
   public jogoService: JogoControllerService,
   private dialog: MatDialog,
   private router: Router,
   private route: ActivatedRoute) {

    this._adapter.setLocale('pt-br');

  }

  ngOnInit() {

    this.route.queryParams
      .subscribe((params) => {
        this.montaJogo = params;
        this.jogoDTO = this.montaJogo;

        if(this.jogoDTO.codigo != null){
          this.botao = "Alterar";
        }

        console.log("Param: ", params)
        console.log("Monta", this.montaJogo)
        console.log("Jogo: ", this.jogoDTO)
        this.preencheForm(this.jogoDTO);
      });
  }

  preencheForm(jogoDto: JogoDto) {
    this.formGroup = this.formBuilder.group({
      codigo: [jogoDto.codigo],
      nomeJogo: [jogoDto.nomeJogo, Validators.required],
      dataLancamento: [jogoDto.dataLancamento, Validators.required],
      desenvolvedora: [jogoDto.desenvolvedora, Validators.required],
      valor: [jogoDto.valor, Validators.required],
      categoria: [jogoDto.categoria, Validators.required],
    });
    console.log("Dados:", this.formGroup.value);
  }

  onSubmit() {
    console.log("Dados: ", this.formGroup.value);

    if (this.jogoDTO.codigo != null) {
      this.jogoService.alterar({id: this.jogoDTO.codigo, body: this.formGroup.value}).subscribe(
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

  confirmarAlteracao(jogoDto: JogoDto) {
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
    this.router.navigate(['/home/jogos'])
  }
}


