import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  createReducer,
  createSelector,
  MemoizedSelector,
  on
} from '@ngrx/store';
import produce from 'immer';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as productActions from '../actions/product.actionts';
import { IProduct } from '../models';

export const featureKey = 'product';

export const adapter: EntityAdapter<IProduct> = createEntityAdapter();

export interface State extends EntityState<IProduct> {
  selectId: number | null;
  searchProducts: number[];
}

const initialState: State = adapter.getInitialState({
  selectId: null,

  searchProducts: []
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
  // search values
  on(productActions.searchProductsSuccess, (state, { ids }) => {
    return {
      ...state,
      searchProducts: ids
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
    selectTotal: selectTotalProducts
  } = adapter.getSelectors(selectorBase);

  const selectProducts = createSelector(selectAll, products => {
    return products;
  });

  const selectedSearchIds = createSelector(
    selectorBase,
    state => state.searchProducts
  );

  const selectProductsWithSerach = createSelector(
    selectAll,
    selectedSearchIds,
    (entities, ids) => {
      if (ids.length == entities.length) {
        return [];
      }
      if (ids.length === 0) {
        return entities;
      }
      return entities.filter(entitie => {
        if (!entitie.id) {
          return false;
        }
        return ids.indexOf(entitie.id) >= 0;
      });
    }
  );

  const selectCurrentProduct = createSelector(
    selectCurrentId,
    selectEntities,
    (id, entities) => (id ? entities[id] : null)
  );

  // selected client of sale

  return {
    selectCurrentId,
    selectProducts,
    selectTotalProducts,
    selectCurrentProduct,
    selectedEntitiesProducts: selectEntities,
    selectProductsWithSerach
  };
};
