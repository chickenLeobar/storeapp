import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadAll } from '../actions/router.actions';
import { loadProducts } from '../actions/product.actionts';
import { loadCategories } from '../actions/category.actions';
import { loadContacts } from '../actions/contact.action';
import { loadAllBusiness } from '../actions/business.actions';
import { loadBrands } from '../actions/brand.actions';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
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
          this.store.dispatch(loadAllBusiness());
          // load brands
          this.store.dispatch(loadBrands({ query: '' }));
        })
      ),
    {
      dispatch: false
    }
  );

  constructor(private actions$: Actions, private store: Store<State>) {}
}
