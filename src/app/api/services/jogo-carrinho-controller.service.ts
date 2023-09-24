/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { JogoCarrinhoDto } from '../models/jogo-carrinho-dto';
import { PkJogoCarrinho } from '../models/pk-jogo-carrinho';

@Injectable({
  providedIn: 'root',
})
export class JogoCarrinhoControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation jogoCarrinhoControllerObterPorId
   */
  static readonly JogoCarrinhoControllerObterPorIdPath = '/api/v1/jogo_carrinho/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `jogoCarrinhoControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  jogoCarrinhoControllerObterPorId$Response(params: {
    id: PkJogoCarrinho;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, JogoCarrinhoControllerService.JogoCarrinhoControllerObterPorIdPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `jogoCarrinhoControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  jogoCarrinhoControllerObterPorId(params: {
    id: PkJogoCarrinho;
  },
  context?: HttpContext

): Observable<any> {

    return this.jogoCarrinhoControllerObterPorId$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation jogoCarrinhoControllerAlterar
   */
  static readonly JogoCarrinhoControllerAlterarPath = '/api/v1/jogo_carrinho/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `jogoCarrinhoControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  jogoCarrinhoControllerAlterar$Response(params: {
    id: PkJogoCarrinho;
    body: JogoCarrinhoDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, JogoCarrinhoControllerService.JogoCarrinhoControllerAlterarPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `jogoCarrinhoControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  jogoCarrinhoControllerAlterar(params: {
    id: PkJogoCarrinho;
    body: JogoCarrinhoDto
  },
  context?: HttpContext

): Observable<any> {

    return this.jogoCarrinhoControllerAlterar$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation jogoCarrinhoControllerRemover
   */
  static readonly JogoCarrinhoControllerRemoverPath = '/api/v1/jogo_carrinho/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `jogoCarrinhoControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  jogoCarrinhoControllerRemover$Response(params: {
    id: PkJogoCarrinho;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, JogoCarrinhoControllerService.JogoCarrinhoControllerRemoverPath, 'delete');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `jogoCarrinhoControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  jogoCarrinhoControllerRemover(params: {
    id: PkJogoCarrinho;
  },
  context?: HttpContext

): Observable<any> {

    return this.jogoCarrinhoControllerRemover$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation jogoCarrinhoControllerListAll
   */
  static readonly JogoCarrinhoControllerListAllPath = '/api/v1/jogo_carrinho';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `jogoCarrinhoControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  jogoCarrinhoControllerListAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, JogoCarrinhoControllerService.JogoCarrinhoControllerListAllPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Listagem Geral
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `jogoCarrinhoControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  jogoCarrinhoControllerListAll(params?: {
  },
  context?: HttpContext

): Observable<any> {

    return this.jogoCarrinhoControllerListAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation jogoCarrinhoControllerIncluir
   */
  static readonly JogoCarrinhoControllerIncluirPath = '/api/v1/jogo_carrinho';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `jogoCarrinhoControllerIncluir()` instead.
   *
   * This method doesn't expect any request body.
   */
  jogoCarrinhoControllerIncluir$Response(params: {
    modeloDTO: JogoCarrinhoDto;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, JogoCarrinhoControllerService.JogoCarrinhoControllerIncluirPath, 'post');
    if (params) {
      rb.query('modeloDTO', params.modeloDTO, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<any>;
      })
    );
  }

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `jogoCarrinhoControllerIncluir$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  jogoCarrinhoControllerIncluir(params: {
    modeloDTO: JogoCarrinhoDto;
  },
  context?: HttpContext

): Observable<any> {

    return this.jogoCarrinhoControllerIncluir$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
