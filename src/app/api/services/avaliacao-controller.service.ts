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

import { AvaliacaoDto } from '../models/avaliacao-dto';

@Injectable({
  providedIn: 'root',
})
export class AvaliacaoControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation avaliacaoControllerObterPorId
   */
  static readonly AvaliacaoControllerObterPorIdPath = '/api/v1/avaliacao/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `avaliacaoControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  avaliacaoControllerObterPorId$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AvaliacaoControllerService.AvaliacaoControllerObterPorIdPath, 'get');
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
   * To access the full response (for headers, for example), `avaliacaoControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  avaliacaoControllerObterPorId(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.avaliacaoControllerObterPorId$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation avaliacaoControllerAlterar
   */
  static readonly AvaliacaoControllerAlterarPath = '/api/v1/avaliacao/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `avaliacaoControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  avaliacaoControllerAlterar$Response(params: {
    id: number;
    body: AvaliacaoDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AvaliacaoControllerService.AvaliacaoControllerAlterarPath, 'put');
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
   * To access the full response (for headers, for example), `avaliacaoControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  avaliacaoControllerAlterar(params: {
    id: number;
    body: AvaliacaoDto
  },
  context?: HttpContext

): Observable<any> {

    return this.avaliacaoControllerAlterar$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation avaliacaoControllerRemover
   */
  static readonly AvaliacaoControllerRemoverPath = '/api/v1/avaliacao/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `avaliacaoControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  avaliacaoControllerRemover$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AvaliacaoControllerService.AvaliacaoControllerRemoverPath, 'delete');
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
   * To access the full response (for headers, for example), `avaliacaoControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  avaliacaoControllerRemover(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.avaliacaoControllerRemover$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation avaliacaoControllerListAll
   */
  static readonly AvaliacaoControllerListAllPath = '/api/v1/avaliacao';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `avaliacaoControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  avaliacaoControllerListAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AvaliacaoControllerService.AvaliacaoControllerListAllPath, 'get');
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
   * To access the full response (for headers, for example), `avaliacaoControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  avaliacaoControllerListAll(params?: {
  },
  context?: HttpContext

): Observable<any> {

    return this.avaliacaoControllerListAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation avaliacaoControllerIncluir
   */
  static readonly AvaliacaoControllerIncluirPath = '/api/v1/avaliacao';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `avaliacaoControllerIncluir()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  avaliacaoControllerIncluir$Response(params: {
    body: AvaliacaoDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AvaliacaoControllerService.AvaliacaoControllerIncluirPath, 'post');
    if (params) {
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
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `avaliacaoControllerIncluir$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  avaliacaoControllerIncluir(params: {
    body: AvaliacaoDto
  },
  context?: HttpContext

): Observable<any> {

    return this.avaliacaoControllerIncluir$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation avaliacaoControllerQuantidadeAvaliacoesJogo
   */
  static readonly AvaliacaoControllerQuantidadeAvaliacoesJogoPath = '/api/v1/avaliacao/api/v1/avaliacao/qtdAvaliacoesJogo';

  /**
   * Quantidade de Avaliações por Jogo
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `avaliacaoControllerQuantidadeAvaliacoesJogo()` instead.
   *
   * This method doesn't expect any request body.
   */
  avaliacaoControllerQuantidadeAvaliacoesJogo$Response(params: {
    jogoSeq: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AvaliacaoControllerService.AvaliacaoControllerQuantidadeAvaliacoesJogoPath, 'get');
    if (params) {
      rb.query('jogoSeq', params.jogoSeq, {});
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
   * Quantidade de Avaliações por Jogo
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `avaliacaoControllerQuantidadeAvaliacoesJogo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  avaliacaoControllerQuantidadeAvaliacoesJogo(params: {
    jogoSeq: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.avaliacaoControllerQuantidadeAvaliacoesJogo$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation avaliacaoControllerObterMediaJogo
   */
  static readonly AvaliacaoControllerObterMediaJogoPath = '/api/v1/avaliacao/api/v1/avaliacao/mediajogo';

  /**
   * Media geral do Jogo
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `avaliacaoControllerObterMediaJogo()` instead.
   *
   * This method doesn't expect any request body.
   */
  avaliacaoControllerObterMediaJogo$Response(params: {
    jogoSeq: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AvaliacaoControllerService.AvaliacaoControllerObterMediaJogoPath, 'get');
    if (params) {
      rb.query('jogoSeq', params.jogoSeq, {});
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
   * Media geral do Jogo
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `avaliacaoControllerObterMediaJogo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  avaliacaoControllerObterMediaJogo(params: {
    jogoSeq: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.avaliacaoControllerObterMediaJogo$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation avaliacaoControllerObterJogosAvaliados
   */
  static readonly AvaliacaoControllerObterJogosAvaliadosPath = '/api/v1/avaliacao/api/v1/avaliacao/jogosAvaliados';

  /**
   * Listagem de Jogos Avaliados
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `avaliacaoControllerObterJogosAvaliados()` instead.
   *
   * This method doesn't expect any request body.
   */
  avaliacaoControllerObterJogosAvaliados$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AvaliacaoControllerService.AvaliacaoControllerObterJogosAvaliadosPath, 'get');
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
   * Listagem de Jogos Avaliados
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `avaliacaoControllerObterJogosAvaliados$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  avaliacaoControllerObterJogosAvaliados(params?: {
  },
  context?: HttpContext

): Observable<any> {

    return this.avaliacaoControllerObterJogosAvaliados$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation avaliacaoControllerObterJogosAvaliadosComMedia
   */
  static readonly AvaliacaoControllerObterJogosAvaliadosComMediaPath = '/api/v1/avaliacao/api/v1/avaliacao/jogosAvaliadosMedia';

  /**
   * Listagem de Jogos Avaliados com media
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `avaliacaoControllerObterJogosAvaliadosComMedia()` instead.
   *
   * This method doesn't expect any request body.
   */
  avaliacaoControllerObterJogosAvaliadosComMedia$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AvaliacaoControllerService.AvaliacaoControllerObterJogosAvaliadosComMediaPath, 'get');
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
   * Listagem de Jogos Avaliados com media
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `avaliacaoControllerObterJogosAvaliadosComMedia$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  avaliacaoControllerObterJogosAvaliadosComMedia(params?: {
  },
  context?: HttpContext

): Observable<any> {

    return this.avaliacaoControllerObterJogosAvaliadosComMedia$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation avaliacaoControllerObterListaAvaliacoesPorUsuario
   */
  static readonly AvaliacaoControllerObterListaAvaliacoesPorUsuarioPath = '/api/v1/avaliacao/api/v1/avaliacao/avaliacoesUser';

  /**
   * Listagem das Avaliações por Usuario
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `avaliacaoControllerObterListaAvaliacoesPorUsuario()` instead.
   *
   * This method doesn't expect any request body.
   */
  avaliacaoControllerObterListaAvaliacoesPorUsuario$Response(params: {
    userSeq: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AvaliacaoControllerService.AvaliacaoControllerObterListaAvaliacoesPorUsuarioPath, 'get');
    if (params) {
      rb.query('userSeq', params.userSeq, {});
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
   * Listagem das Avaliações por Usuario
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `avaliacaoControllerObterListaAvaliacoesPorUsuario$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  avaliacaoControllerObterListaAvaliacoesPorUsuario(params: {
    userSeq: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.avaliacaoControllerObterListaAvaliacoesPorUsuario$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation avaliacaoControllerObterListaAvaliacaoPorJogo
   */
  static readonly AvaliacaoControllerObterListaAvaliacaoPorJogoPath = '/api/v1/avaliacao/api/v1/avaliacao/avaliacoesJogo';

  /**
   * Listagem das Avaliações por Jogo
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `avaliacaoControllerObterListaAvaliacaoPorJogo()` instead.
   *
   * This method doesn't expect any request body.
   */
  avaliacaoControllerObterListaAvaliacaoPorJogo$Response(params: {
    jogoSeq: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AvaliacaoControllerService.AvaliacaoControllerObterListaAvaliacaoPorJogoPath, 'get');
    if (params) {
      rb.query('jogoSeq', params.jogoSeq, {});
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
   * Listagem das Avaliações por Jogo
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `avaliacaoControllerObterListaAvaliacaoPorJogo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  avaliacaoControllerObterListaAvaliacaoPorJogo(params: {
    jogoSeq: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.avaliacaoControllerObterListaAvaliacaoPorJogo$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
