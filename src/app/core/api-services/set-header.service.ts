import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SetHeaderService {
  httpHeaders: any;

  constructor() {}

  gettoken() {
    return !!localStorage.getItem('token');
  }

  getHeaders(isToken: boolean) {
    const token = localStorage.getItem('token');

    {
      /**
       * product type will get from http headers
       * As this has to be maintain at UI end
       * So that product headers can be configurable according to prodct need
       * Thus it will be avoidabel to maintain at http end
       */
      // const token = localStorage.getItem('token');

      this.httpHeaders = {
        headers: new HttpHeaders(''),
      };
    }

    this.httpHeaders.headers = this.httpHeaders.headers.append(
      'x-frame-options',
      'SAMEORIGIN'
    );

    return this.httpHeaders;
  }
}
