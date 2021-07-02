import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HandleErrorsService } from '../services/handle-errors.service';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private handleErrors: HandleErrorsService) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        this.handleErrors.manageErrors(errorResponse);
        return EMPTY;
      })
    );
  }
}
