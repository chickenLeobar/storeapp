import { switchMap, map, exhaustMap, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as businessActions from '../actions/business.actions';
import { NegocioService } from '../services/business.service';
@Injectable()
export class BusinessEffects {
  $loadAllBusiness = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.loadAllBusiness),
      switchMap(() =>
        this.businessService
          .getNegocios()
          .pipe(
            map(data =>
              businessActions.loadAllBusinessSuccess({ negocios: data })
            )
          )
      )
    )
  );

  $saveBusiness = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.saveBusiness),
      exhaustMap(({ negocio }) =>
        this.businessService
          .createNegocio(negocio)
          .pipe(
            map(data => businessActions.saveBusinessSucess({ negocio: data }))
          )
      )
    )
  );

  $editBusiness = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.editBusiness),
      exhaustMap(({ negocio }) =>
        this.businessService
          .updateNegocio(negocio)
          .pipe(
            map(data =>
              businessActions.editBusinesSuccess({ negocio: negocio })
            )
          )
      )
    )
  );
  $removeBusiness = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.removeBusiness),
      switchMap(({ negocio }) =>
        this.businessService
          .deleteNegocio(negocio)
          .pipe(
            map(data =>
              businessActions.removeBusinesSuccess({ negocio: negocio })
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private businessService: NegocioService
  ) {}
}
