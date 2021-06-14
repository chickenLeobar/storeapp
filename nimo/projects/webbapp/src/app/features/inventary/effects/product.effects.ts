import { switchMap, map, concatMap, exhaustMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../services/product.service';
import * as productActions from '../actions/product.actionts';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
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
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store<State>
  ) {}
}
