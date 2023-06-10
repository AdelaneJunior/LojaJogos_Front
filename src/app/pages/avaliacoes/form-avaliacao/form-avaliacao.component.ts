import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DateAdapter} from "@angular/material/core";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {AvaliacaoControllerService} from "../../../api/services/avaliacao-controller.service";
import {JogoControllerService} from "../../../api/services/jogo-controller.service";

@Component({
  selector: 'app-form-avaliacao',
  templateUrl: './form-avaliacao.component.html',
  styleUrls: ['./form-avaliacao.component.css']
})
export class FormAvaliacaoComponent {
  formGroup !: FormGroup;
  paramCodigo: any;
  codigo!: number;

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
              nota:[null, Validators.required]
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

  }


}
