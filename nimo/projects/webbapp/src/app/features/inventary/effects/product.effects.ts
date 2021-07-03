import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { IProduct } from './../models/index';
import {
  switchMap,
  map,
  concatMap,
  exhaustMap,
  take,
  switchMapTo
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import { ProductService } from '../services/product.service';
import * as productActions from '../actions/product.actionts';
import { Store } from '@ngrx/store';
import {
  selectProductsOfSale,
  State,
  selectProducts,
  selectedInfoOfSale,
  selectedWorkingBusiness
} from '../reducers';
import { authSelectors } from '../../auth/reducers';
import { SaleService } from '../services/sale.service';
import { tapResponse } from '@ngrx/component-store';
import { of, EMPTY, Observable } from 'rxjs';
import { filtersAreDirty } from 'shared';
import { LoadingService } from '../../../core/ui/loading/loading.service';
import * as saleActions from '../actions/sale.action';
import { combineLatest } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
@Injectable()
export class ProductEffects {
  $loadProducts = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.loadProducts),
      switchMap(() =>
        this.productService
          .getProducts()
          .pipe(
            map(data => productActions.loadProductSuccess({ products: data }))
          )
      )
    )
  );

  $addProduct = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.addProduct),
      concatMap(data =>
        this.productService
          .createProduct(data.product)
          .pipe(
            map(data => productActions.addProductSuccess({ product: data }))
          )
      )
    )
  );

  $selectProduct = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.addProductSuccess),
      map(actin => productActions.selectProduct({ product: actin.product }))
    )
  );

  $editProduct = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.editProduct),
      exhaustMap(({ product }) =>
        this.productService.updateProduct(product).pipe(
          map(data => {
            // this.store.dispatch(productActions.cleanProductId());
            return productActions.editProductSuccess({ product: data });
          })
        )
      )
    )
  );
  $deleteProduct = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.removeProduct),
      exhaustMap(({ product }) =>
        this.productService
          .deleteProduct(product)
          .pipe(
            map(data =>
              productActions.removeProductSuccess({ product: product })
            )
          )
      )
    )
  );

  private obtainSale = (source: Observable<NzSafeAny>) => {
    const details = this.store.select(selectProductsOfSale);
    const info = this.store.select(selectedInfoOfSale);
    const user = this.store.select(authSelectors.getUser);
    const business = this.store.select(selectedWorkingBusiness);

    const combine = combineLatest([details, info, user, business])
      .pipe(
        map(([details, info, user, business]) => {
          return {
            details,
            info,
            user,
            business
          };
        })
      )
      .pipe(take(1));
    return source.pipe(switchMapTo(combine));
  };

  /*=============================================
   =            Sale actions            =
   =============================================*/
  $saveSale = createEffect(
    () =>
      this.actions$.pipe(
        ofType(saleActions.saveSale),
        this.obtainSale,
        exhaustMap(({ details: items, info, user, business }) => {
          const details = items.map(node => ({
            producto: node.product?.id,
            cantidad: node.count
          }));
          return this.saleService
            .saveSale({
              details: details,
              fecha_venta: info?.date!,
              cliente: info?.selectedContact!,
              vendedor: user?.id,
              business: business!
            })
            .pipe(
              tapResponse(
                res => {
                  this.store.dispatch(saleActions.cleanSale());
                  this.message.success('Venta creada correctamente');
                },
                err => {
                  console.log(err);
                }
              )
            );
        })
      ),
    {
      dispatch: false
    }
  );

  // search products

  $searchProducts = createEffect(() =>
    this.actions$.pipe(ofType(productActions.searchProducts)).pipe(
      concatLatestFrom(() => this.store.select(selectProducts)),
      switchMap(([{ brand, category, query }, products]) => {
        const ids = this.filterProducts({ brand, category, query }, products);
        return of(productActions.searchProductsSuccess({ ids: ids }));
      })
    )
  );

  // loading
  $loadingController = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          productActions.addProductSuccess,
          productActions.removeProductSuccess,
          productActions.editProductSuccess
        ),
        switchMap(res => {
          this.loading.hide();
          return EMPTY;
        })
      ),
    {
      dispatch: false
    }
  );

  private filterProducts(
    filters: { category?: number; brand?: number; query?: string },
    products: IProduct[]
  ) {
    let arr: IProduct[] = products;
    let applyFilters = (pr: IProduct) => {
      let shouldBeReturn = false;
      if (filters?.category && filters?.category != -1) {
        shouldBeReturn = pr.category == filters.category;
      }
      if (filters?.brand && filters?.brand != -1) {
        shouldBeReturn = pr.brand == filters.brand;
      }
      if (filters?.query && filters.query != '') {
        shouldBeReturn =
          pr.name
            .toLocaleLowerCase()
            .indexOf(filters.query?.toLocaleLowerCase() || '') >= 0;
      }
      return shouldBeReturn;
    };
    // apply filters
    arr = arr.filter(applyFilters);
    if (!filtersAreDirty(filters) && arr.length == products.length) {
      return [];
    }
    if (filtersAreDirty(filters) && arr.length == 0) {
      return products.map(pr => pr.id);
    }
    const ids = arr.map(pr => pr.id);
    return ids;
  }

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store<State>,
    private saleService: SaleService,
    private loading: LoadingService,
    private message: NzMessageService
  ) {}
}
