import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {Observable} from "rxjs";
import {JogoCarrinhoDto} from "../../../api/models/jogo-carrinho-dto";
import {CarrinhoControllerService} from "../../../api/services/carrinho-controller.service";
import {JogoCarrinhoControllerService} from "../../../api/services/jogo-carrinho-controller.service";
import {MessageService} from "../../../arquitetura/message/message.service";
import {SecurityService} from "../../../arquitetura/security/security.service";
import {UsuarioControllerService} from "../../../api/services/usuario-controller.service";
import {UsuarioDto} from "../../../api/models/usuario-dto";
import {CarrinhoDto} from "../../../api/models/carrinho-dto";

@Injectable()
export class CarrinhoResolve implements Resolve<any> {

  usuarioDto !: UsuarioDto;
  carrinhoDto !: CarrinhoDto;

  constructor(
    private router: Router,
    private carrinhoService: CarrinhoControllerService,
    private jogoCarrinhoService: JogoCarrinhoControllerService,
    private messageService: MessageService,
    private securityService: SecurityService,
    private usuarioService: UsuarioControllerService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<JogoCarrinhoDto[]> {

    return new Observable(observer => {

        let codigo: number = this.securityService.getUserId();

        this.usuarioService.usuarioControllerObterPorId({id: codigo}).subscribe(
          retorno => {
            this.usuarioDto = retorno;
            codigo = this.usuarioDto.carrinhoCodigo || 0;

            this.carrinhoService.carrinhoControllerObterPorId({id: codigo}).subscribe(
              retorno => {
                this.carrinhoDto = retorno
                observer.next(retorno);
                observer.complete();
              } ,
              error =>{
                observer.error(error);
                this.router.navigate(['']);
                this.messageService.addMsgDanger(error);
              }
            )
          }
        )
      }
    );
  }
}
