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
  on(productActions.editProduct, (state, { product }) => {
    return adapter.setOne(product, state);
  }),
  // remove product
  on(productActions.removeProduct, (state, { product }) => {
    return adapter.removeOne(product.id, state);
  })
);

export const getSelectors = (
  selectorBase: MemoizedSelector<NzSafeAny, State>
) => {
  const selectCurrentId = createSelector(selectorBase, state => state.selectId);
  return {
    selectCurrentId
  };
};
