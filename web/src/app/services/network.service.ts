import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class NetworkService {
  hostUrl: String = document.location.origin;
  constructor(private httpClient: HttpClient) {}

  private provideDefaultHeader(): any {
    return {
      Headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => error.error);
  }

  sendData(data: { [k: string]: { [k: string]: string } }) {
    return this.httpClient
      .post(
        this.hostUrl + '/api/yappyapp',
        JSON.stringify(data),
        this.provideDefaultHeader()
      )
      .pipe(catchError(this.handleError));
  }
}
