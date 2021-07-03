import { take, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectedWorkingBusiness, State } from '../reducers';
import { authSelectors } from '../../auth/reducers';
import { concatLatestFrom } from '@ngrx/effects';
@Injectable()
export class AddParamsInterceptor implements HttpInterceptor {
  constructor(private store: Store<State>) {}

  private $user = this.store.select(authSelectors.getUser).pipe(take(1));

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.store.select(selectedWorkingBusiness).pipe(
      take(1),
      concatLatestFrom(() => this.$user),
      mergeMap(([business, user]) => {
        if (business) {
          let params = request.params;
          params = params.append('business', String(business));
          const cloneRequest = request.clone({ params: params });
          return next.handle(cloneRequest);
        } else {
          return next.handle(request);
        }
      })
    );
  }
}
