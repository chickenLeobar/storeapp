import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  State,
  selectBrands,
  selectCategories,
  selectProducts
} from '../../reducers';
import { ComponentStore } from '@ngrx/component-store';
import * as categoriactions from '../../actions/category.actions';
import * as fromActions from '../../actions/brand.actions';
import * as productActions from '../../actions/product.actionts';
export interface SaleStore {}

@Injectable()
export class SaleStoreService extends ComponentStore<SaleStore> {
  constructor(private store: Store<State>) {
    super({});
    this.store.dispatch(categoriactions.loadCategories({ query: '' }));
    this.store.dispatch(fromActions.loadBrands({ query: '' }));
    this.store.dispatch(productActions.loadProducts());
  }

  brands$ = this.store.select(selectBrands);
  categories$ = this.store.select(selectCategories);
  products$ = this.store.select(selectProducts);
  public readonly $vm = this.select(
    this.brands$,
    this.categories$,
    this.products$,
    (brands, categories, products) => {
      return {
        brands,
        categories,
        products
      };
    }
  );
}
