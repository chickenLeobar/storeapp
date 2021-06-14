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

export interface State extends EntityState<IProduct> {
  selectId: number | null;
}

const initialState: State = adapter.getInitialState({
  selectId: null
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
