import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { LAST_ROUTE_KEY } from '../../globals/constants';
@Injectable()
export class RouterEffects {
  $saveLastRouter = createEffect(
    () =>
      this.actions$.pipe(
        ofType(routerNavigatedAction),
        map(route => {
          localStorage.setItem(LAST_ROUTE_KEY, route.payload.event.url);
        })
      ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
