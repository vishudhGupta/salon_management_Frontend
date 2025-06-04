import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { catchError, map, Subject, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiServiceService {
  constructor(private httpService: HttpService) {}
  getStatusEvent: Subject<any> = new Subject();
  addressLine: any = false;

  /**
   * method for get request api
   **/
  getRequestedResponse(
    url: string,
    productModuleName?: string,
    queryParamsUrl?: string
  ) {
    if (queryParamsUrl) {
      url = url + queryParamsUrl;
    }
    return this.httpService.getRequest(url, productModuleName).pipe(
      map((response: any) => response),
      catchError((err: any) => JSON.stringify(this.errorHandler(err)))
    );
  }
  errorHandler(err: any) {
    let error;
    const status = err;
    this.setStatusEvent(err);
    if (err.error) {
      error = err.error;
    } else if (err.details) {
      error = err.detail;
    } else {
      error = err;
    }
  }

  setStatusEvent(addOnDataEmiited: any) {
    this.getStatusEvent.next(addOnDataEmiited);
  }

  /**
   * method for get request api without popup
   **/
  getRequestedResponsewithoutpopup(url: string, productModuleName?: string) {
    return this.httpService
      .getRequest(url, productModuleName)
      .pipe(catchError(this.handleError));
  }
  /**
   * method for post request api
   **/
  postRequestedResponse(url: any, body: any) {
    return this.httpService.postRequest(url, body).pipe(
      map((response: any) => response),
      catchError((err: any) => JSON.stringify(this.errorHandler(err)))
    );
  }

  /**
   * method for put request api
   **/
  putRequestedResponse(url: any, body: any) {
    return this.httpService.putRequest(url, body).pipe(
      map((response: any) => response),
      catchError((err: any) => JSON.stringify(this.errorHandler(err)))
    );
  }
  /**
   * method for patch request api
   **/
  patchRequestedResponse(url: any, body: any) {
    return this.httpService.patchRequest(url, body).pipe(
      map((response: any) => response),
      catchError((err: any) => JSON.stringify(this.errorHandler(err)))
    );
  }

  /**
   * method for post request api without popup
   **/
  postRequestedResponsewithoutpopup(url: any, body: any) {
    return this.httpService.postRequest(url, body).pipe(
      catchError((err: HttpErrorResponse) => {
        JSON.stringify(err);
        return throwError(err);
      })
    );
  }
  deleteData(url: any, body?: any) {
    return this.httpService.deleteRequestWithToken(url, body).pipe(
      map((response) => response),
      catchError((err) => JSON.stringify(err))
    );
  }

  deleteDataWithoutPopup(url: any, body?: any) {
    return this.httpService
      .deleteRequestWithToken(url, body)
      .pipe(catchError(this.handleError));
  }
  /**
   * method use for the error handing
   **/
  private handleError(error: HttpErrorResponse) {
    let errormessage: any;
    if (error) {
      for (const key in error.error) {
        errormessage = error.error[`${key}`];
      }
    }

    // Return an observable with a user-facing error message.
    // errormessage+="invalid"
    return throwError(() => new Error(errormessage));
  }
}
