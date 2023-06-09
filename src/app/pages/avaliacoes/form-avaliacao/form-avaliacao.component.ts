import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {AvaliacaoControllerService} from "../../../api/services/avaliacao-controller.service";
import {JogoControllerService} from "../../../api/services/jogo-controller.service";
import {AvaliacaoDto} from "../../../api/models/avaliacao-dto";
import {
  ConfirmationDialog,
  ConfirmationDialogResult
} from "../../../core/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-form-avaliacao',
  templateUrl: './form-avaliacao.component.html',
  styleUrls: ['./form-avaliacao.component.css']
})
export class FormAvaliacaoComponent {
  formGroup !: FormGroup;
  paramCodigo: any;
  codigo!: number;
  value = 1;

  constructor
  (private formBuilder: FormBuilder,
   private _adapter: DateAdapter<any>,
   private dialog: MatDialog,
   private router: Router,
   private activatedRoute: ActivatedRoute,
   private jogoService:JogoControllerService,
   private avaliacaoService: AvaliacaoControllerService) {

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
            console.log("Retorno", retorno)
            this.formGroup = this.formBuilder.group({
              nomeJogo: new FormControl({
                value:retorno.nomeJogo, disabled:true
              }),
              descricao:[null, Validators.required],
              nota:[null, Validators.required],
              jogoSeq:[retorno.codigo, Validators.required]
            })
          })
      }
    }
  }

  createForm() {

    this.formGroup = this.formBuilder.group({
      nomeJogo: new FormControl({
        value: '', disabled: true
      }),
      descricao: [null, Validators.required],
      nota: [null, Validators.required],
    });

  }

  onSubmit() {
    console.log("DADOS: ", this.formGroup.value)
    this.avaliacaoService.incluir1({body:this.formGroup.value}).subscribe(
      retorno =>{
        console.log("Funcionou: ", retorno);
        this.confirmarAvaliacao(retorno);
      },
      error => {
        console.log("Não funcionou", +error)
        alert("Não incluido");
      }
    )
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.formGroup.controls[controlName].hasError(errorName);
  };

  confirmarAvaliacao(avaliacao: AvaliacaoDto) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: {
        titulo: 'Mensagem!!!',
        mensagem: `Inclusão da avaliação do jogo: ${avaliacao.nomeJogo} (ID: ${avaliacao.jogoSeq}) nota: ${avaliacao.nota} realiza com sucesso!`,
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
     this.router.navigate(['/avaliacao'])
  }
}
