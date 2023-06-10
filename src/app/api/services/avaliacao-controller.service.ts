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
   * Path part for operation obterPorId1
   */
  static readonly ObterPorId1Path = '/api/v1/avaliacao/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `obterPorId1()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPorId1$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AvaliacaoControllerService.ObterPorId1Path, 'get');
    if (params) {
      rb.query('id', params.id, {});
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
   * To access the full response (for headers, for example), `obterPorId1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  obterPorId1(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.obterPorId1$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation alterar1
   */
  static readonly Alterar1Path = '/api/v1/avaliacao/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `alterar1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterar1$Response(params: {
    id: number;
    body: AvaliacaoDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AvaliacaoControllerService.Alterar1Path, 'put');
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
   * To access the full response (for headers, for example), `alterar1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  alterar1(params: {
    id: number;
    body: AvaliacaoDto
  },
  context?: HttpContext

): Observable<any> {

    return this.alterar1$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation remover1
   */
  static readonly Remover1Path = '/api/v1/avaliacao/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `remover1()` instead.
   *
   * This method doesn't expect any request body.
   */
  remover1$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AvaliacaoControllerService.Remover1Path, 'delete');
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
   * To access the full response (for headers, for example), `remover1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  remover1(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.remover1$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation listAll1
   */
  static readonly ListAll1Path = '/api/v1/avaliacao';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listAll1()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAll1$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AvaliacaoControllerService.ListAll1Path, 'get');
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
   * To access the full response (for headers, for example), `listAll1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listAll1(params?: {
  },
  context?: HttpContext

): Observable<any> {

    return this.listAll1$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation incluir1
   */
  static readonly Incluir1Path = '/api/v1/avaliacao';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `incluir1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluir1$Response(params: {
    body: AvaliacaoDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, AvaliacaoControllerService.Incluir1Path, 'post');
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
   * To access the full response (for headers, for example), `incluir1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  incluir1(params: {
    body: AvaliacaoDto
  },
  context?: HttpContext

): Observable<any> {

    return this.incluir1$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
