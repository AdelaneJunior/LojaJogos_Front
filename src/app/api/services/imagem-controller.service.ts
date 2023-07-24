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

import { MessageResponse } from '../models/message-response';

@Injectable({
  providedIn: 'root',
})
export class ImagemControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation imagemControllerUploadImagem
   */
  static readonly ImagemControllerUploadImagemPath = '/api/v1/imagem/upload';

  /**
   * Adiciona um arquivo no storage
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `imagemControllerUploadImagem()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  imagemControllerUploadImagem$Response(params?: {
    body?: {
'imagemASalvar': Blob;
}
  },
  context?: HttpContext

): Observable<StrictHttpResponse<MessageResponse>> {

    const rb = new RequestBuilder(this.rootUrl, ImagemControllerService.ImagemControllerUploadImagemPath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<MessageResponse>;
      })
    );
  }

  /**
   * Adiciona um arquivo no storage
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `imagemControllerUploadImagem$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  imagemControllerUploadImagem(params?: {
    body?: {
'imagemASalvar': Blob;
}
  },
  context?: HttpContext

): Observable<MessageResponse> {

    return this.imagemControllerUploadImagem$Response(params,context).pipe(
      map((r: StrictHttpResponse<MessageResponse>) => r.body as MessageResponse)
    );
  }

}
