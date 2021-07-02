import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  State,
  selectBrands,
  selectCategories,
  contactSelectors,
  selectProductsOfSale,
  selectProductsWithSerach
} from '../../reducers';
import { ComponentStore } from '@ngrx/component-store';

import * as saleActions from '../../actions/sale.action';
export interface SaleStore {}

@Injectable()
export class SaleStoreService extends ComponentStore<SaleStore> {
  constructor(private store: Store<State>) {
    super({});
  }
  /*=============================================
  =            Dispatch actions            =
  =============================================*/

  public cancelSale() {
    this.store.dispatch(saleActions.cleanSale());
  }
  public saveSale(): void {
    this.store.dispatch(saleActions.saveSale());
  }

  /*=============================================
  =            VIEW             =
  =============================================*/
  brands$ = this.store.select(selectBrands);
  categories$ = this.store.select(selectCategories);
  products$ = this.store.select(selectProductsWithSerach);
  sales$ = this.store.select(selectProductsOfSale);
  contacts$ = this.store.select(
    contactSelectors.selectPerTypeContact('CLIENT')
  );

  totalAndCount$ = this.select(this.sales$, sales => {
    const [count, mont] = sales.reduce(
      (prev, curr) => {
        let shouldAumentCount = 0;
        let shouldAumentMont = 0;
        if (curr.product?.method_cont !== 'MONT') {
          if (curr.product?.mont_exist)
            shouldAumentMont = curr.count * curr.product?.mont_exist;
          if (curr.product?.mont_enter) shouldAumentCount = curr.count;
        } else {
          shouldAumentCount = 1;
          shouldAumentMont = curr.mont;
        }
        return [prev[0] + shouldAumentCount, prev[1] + shouldAumentMont];
      },
      [0, 0]
    );
    return {
      count: count,
      mont: mont
    };
  });

  public readonly $vm = this.select(
    this.brands$,
    this.categories$,
    this.products$,
    this.sales$,
    this.totalAndCount$,
    this.contacts$,
    (brands, categories, products, sales, totalAndCount, contacts) => {
      return {
        brands,
        categories,
        products,
        sales,
        totalAndCount,
        contacts
      };
    }
  );
}
