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

import { CarrinhoDto } from '../models/carrinho-dto';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation carrinhoControllerObterPorId
   */
  static readonly CarrinhoControllerObterPorIdPath = '/api/v1/carrinho/{id}';

  /**
   * Obter os dados completos de uma entidiade pelo id informado!
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `carrinhoControllerObterPorId()` instead.
   *
   * This method doesn't expect any request body.
   */
  carrinhoControllerObterPorId$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, CarrinhoControllerService.CarrinhoControllerObterPorIdPath, 'get');
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
   * To access the full response (for headers, for example), `carrinhoControllerObterPorId$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  carrinhoControllerObterPorId(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.carrinhoControllerObterPorId$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation carrinhoControllerAlterar
   */
  static readonly CarrinhoControllerAlterarPath = '/api/v1/carrinho/{id}';

  /**
   * Método utilizado para altlerar os dados de uma entidiade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `carrinhoControllerAlterar()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  carrinhoControllerAlterar$Response(params: {
    id: number;
    body: CarrinhoDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, CarrinhoControllerService.CarrinhoControllerAlterarPath, 'put');
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
   * To access the full response (for headers, for example), `carrinhoControllerAlterar$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  carrinhoControllerAlterar(params: {
    id: number;
    body: CarrinhoDto
  },
  context?: HttpContext

): Observable<any> {

    return this.carrinhoControllerAlterar$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation carrinhoControllerRemover
   */
  static readonly CarrinhoControllerRemoverPath = '/api/v1/carrinho/{id}';

  /**
   * Método utilizado para remover uma entidiade pela id informado
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `carrinhoControllerRemover()` instead.
   *
   * This method doesn't expect any request body.
   */
  carrinhoControllerRemover$Response(params: {
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, CarrinhoControllerService.CarrinhoControllerRemoverPath, 'delete');
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
   * To access the full response (for headers, for example), `carrinhoControllerRemover$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  carrinhoControllerRemover(params: {
    id: number;
  },
  context?: HttpContext

): Observable<any> {

    return this.carrinhoControllerRemover$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation carrinhoControllerListAll
   */
  static readonly CarrinhoControllerListAllPath = '/api/v1/carrinho';

  /**
   * Listagem Geral
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `carrinhoControllerListAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  carrinhoControllerListAll$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, CarrinhoControllerService.CarrinhoControllerListAllPath, 'get');
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
   * To access the full response (for headers, for example), `carrinhoControllerListAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  carrinhoControllerListAll(params?: {
  },
  context?: HttpContext

): Observable<any> {

    return this.carrinhoControllerListAll$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

  /**
   * Path part for operation carrinhoControllerIncluir
   */
  static readonly CarrinhoControllerIncluirPath = '/api/v1/carrinho';

  /**
   * Método utilizado para realizar a inclusão de um entidade
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `carrinhoControllerIncluir()` instead.
   *
   * This method doesn't expect any request body.
   */
  carrinhoControllerIncluir$Response(params: {
    modeloDTO: CarrinhoDto;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<any>> {

    const rb = new RequestBuilder(this.rootUrl, CarrinhoControllerService.CarrinhoControllerIncluirPath, 'post');
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
   * To access the full response (for headers, for example), `carrinhoControllerIncluir$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  carrinhoControllerIncluir(params: {
    modeloDTO: CarrinhoDto;
  },
  context?: HttpContext

): Observable<any> {

    return this.carrinhoControllerIncluir$Response(params,context).pipe(
      map((r: StrictHttpResponse<any>) => r.body as any)
    );
  }

}
