import { NzSafeAny } from 'ng-zorro-antd/core/types';

import {
  createReducer,
  on,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { IProduct } from '../models';
import * as productActions from '../actions/product.actionts';
export const featureKey = 'product';

export const adapter: EntityAdapter<IProduct> = createEntityAdapter();
import produce from 'immer';
export interface State extends EntityState<IProduct> {
  selectId: number | null;
  saleProducts: { id: number; mont: number }[];
}

const initialState: State = adapter.getInitialState({
  selectId: null,
  saleProducts: []
});

export const reducer = createReducer(
  initialState,
  // add product
  on(productActions.addProductSuccess, (state, { product }) => {
    return adapter.setOne(product, state);
  }),
  /// load products
  on(productActions.loadProductSuccess, (state, { products }) => {
    return adapter.setAll(products, state);
  }),
  // edit products
  on(productActions.editProductSuccess, (state, { product }) => {
    return adapter.setOne(product, state);
  }),
  // remove product
  on(productActions.removeProductSuccess, (state, { product }) => {
    return adapter.removeOne(product.id, state);
  }),
  // selected product
  on(productActions.selectProduct, (state, { product }) => {
    return {
      ...state,
      selectId: product.id
    };
  }),
  // clean product id
  on(productActions.cleanProductId, state => {
    return {
      ...state,
      selectId: null
    };
  }),
  // add product for
  on(productActions.addProductForSale, (state, { id, mont }) => {
    return produce(state, draf => {
      if (draf.saleProducts.some(d => d.id == id)) {
        // exist poduct
        if (mont <= 0) {
          draf.saleProducts.filter(pr => pr.id !== id);
        } else {
          // replace id
          draf.saleProducts.map(pr => {
            if (pr.id == id) {
              pr.mont = mont;
            }
            return pr;
          });
        }
      } else {
        // push
        draf.saleProducts.push({ id, mont });
      }
    });
  })
);

export const getSelectors = (
  selectorBase: MemoizedSelector<NzSafeAny, State>
) => {
  const selectCurrentId = createSelector(selectorBase, state => state.selectId);
  const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal: selectTotalProducts
  } = adapter.getSelectors(selectorBase);
  const selectProducts = createSelector(selectAll, products => {
    return products;
  });
  const selectCurrentProduct = createSelector(
    selectCurrentId,
    selectEntities,
    (id, entities) => (id ? entities[id] : null)
  );

  return {
    selectCurrentId,
    selectProducts,
    selectTotalProducts,
    selectCurrentProduct
  };
};
