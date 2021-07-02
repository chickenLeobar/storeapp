import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadAll } from '../actions/router.actions';
import { loadProducts, loadProductSuccess } from '../actions/product.actionts';
import {
  loadCategories,
  loadCategoriesSucess
} from '../actions/category.actions';
import { loadContacts, loadContactsSucess } from '../actions/contact.action';
import { loadBrands, loadBrandsSucces } from '../actions/brand.actions';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import { LoadingService } from '../../../core/ui/loading/loading.service';

@Injectable()
export class DataEffects {
  $loadAll = createEffect(
    () =>
      this.actions$.pipe(ofType(loadAll)).pipe(
        map(() => {
          // load products
          this.store.dispatch(loadProducts());
          // load categories
          this.store.dispatch(loadCategories({ query: '' }));
          // load contacts
          this.store.dispatch(loadContacts());
          //load business
          // this.store.dispatch(loadAllBusiness());
          // load brands
          this.store.dispatch(loadBrands({ query: '' }));
        })
      ),
    {
      dispatch: false
    }
  );
  $loadingStart = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadProducts, loadContacts, loadCategories, loadBrands),
        map(() => {
          if (!this.loading.isVisible) {
            this.loading.show();
          }
        })
      ),
    { dispatch: false }
  );

  $hideLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          loadCategoriesSucess,
          loadContactsSucess,
          loadProductSuccess,
          loadBrandsSucces
        ),
        map(() => {
          this.loading.hide();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private loading: LoadingService
  ) {}
}
