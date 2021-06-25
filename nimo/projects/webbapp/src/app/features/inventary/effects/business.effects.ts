import { switchMap, map, exhaustMap, mergeMap, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import * as businessActions from '../actions/business.actions';
import { NegocioService } from '../services/business.service';
import { Store } from '@ngrx/store';
import { State, selectRawBusiness } from '../reducers';
import { filtersAreDirty } from 'shared';
import { LoadingService } from '../components/loading/loading.service';
@Injectable()
export class BusinessEffects {
  $loadAllBusiness = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.loadAllBusiness),
      switchMap(() => {
        return this.businessService
          .getNegocios()
          .pipe(
            map(data =>
              businessActions.loadAllBusinessSuccess({ negocios: data })
            )
          );
      })
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
  $searchBusiness = createEffect(() =>
    this.actions$.pipe(
      ofType(businessActions.searchBusiness),
      concatLatestFrom(() => this.store.select(selectRawBusiness)),
      map(([{ query }, business]) => {
        let ids = business
          .filter(
            deal =>
              deal.name
                .toLocaleLowerCase()
                .indexOf(query.toLocaleLowerCase()) >= 0
          )
          .map(deal => deal.id);

        let isIntial = true;
        if (filtersAreDirty({ query }) && ids.length == 0) {
          isIntial = false;
        }
        return businessActions.searchBusinessSuccess({
          ids: ids,
          isInitial: isIntial
        });
      })
    )
  );
  // listen success actions for close loading

  $closeLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          businessActions.saveBusinessSucess,
          businessActions.editBusinesSuccess,
          businessActions.removeBusinesSuccess
        ),
        map(() => {
          this.store.dispatch(businessActions.cleanSelectedBusiness());
          this.loading.hide();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private businessService: NegocioService,
    private store: Store<State>,
    private loading: LoadingService
  ) {}
}
