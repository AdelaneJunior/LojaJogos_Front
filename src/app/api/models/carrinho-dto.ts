/* tslint:disable */
/* eslint-disable */
import { JogoCarrinhoDto } from './jogo-carrinho-dto';
export interface CarrinhoDto {
  codigo?: number;
  jogoCarrinho?: Array<JogoCarrinhoDto>;
  precoFinal?: number;
}
