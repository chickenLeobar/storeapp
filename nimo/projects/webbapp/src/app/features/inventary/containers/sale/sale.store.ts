import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  State,
  selectBrands,
  selectCategories,
  selectProducts,
  selectProductSale,
  selectProductsWithSerach
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

  /*=============================================
  =            Dispatch actions            =
  =============================================*/

  public cancelSale() {
    this.store.dispatch(productActions.cleanSale());
  }
  public saveSale(): void {
    this.store.dispatch(productActions.saveSale());
  }

  /*=============================================
  =            VIEW             =
  =============================================*/
  brands$ = this.store.select(selectBrands);
  categories$ = this.store.select(selectCategories);
  products$ = this.store.select(selectProductsWithSerach);
  sales$ = this.store.select(selectProductSale);

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
    (brands, categories, products, sales, totalAndCount) => {
      return {
        brands,
        categories,
        products,
        sales,
        totalAndCount
      };
    }
  );
}
