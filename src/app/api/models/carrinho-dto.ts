/* tslint:disable */
/* eslint-disable */
import { JogoCarrinhoDto } from './jogo-carrinho-dto';
export interface CarrinhoDto {
  codigo?: number;
  jogos?: Array<JogoCarrinhoDto>;
  precoFinal?: number;
}
