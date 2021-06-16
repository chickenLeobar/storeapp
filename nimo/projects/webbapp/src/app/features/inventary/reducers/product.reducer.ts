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
  saleProducts: Record<number, { mont: number; count: number }>;
}

const initialState: State = adapter.getInitialState({
  selectId: null,
  saleProducts: [],
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
  // add product for
  on(productActions.addProductForSale, (state, { product, count }) => {
    return produce(state, draf => {
      let pr = draf.saleProducts[product.id];
      if (pr) {
        if (product.method_cont == 'MONT') {
          draf.saleProducts[product.id] = {
            count: count,
            mont: count
          };
        } else {
          draf.saleProducts[product.id] = {
            count: count,
            mont: count * product.mont_exist
          };
        }
      } else {
        draf.saleProducts[product.id] = {
          count: 0,
          mont: 0
        };
      }
    });
  }),
  // clean sale
  on(productActions.cleanSale, state => {
    return {
      ...state,
      saleProducts: {}
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

  const selecSaleInfo = createSelector(
    selectorBase,
    state => state.saleProducts
  );

  const selectCurrentProduct = createSelector(
    selectCurrentId,
    selectEntities,
    (id, entities) => (id ? entities[id] : null)
  );

  // select product of sale
  const selectProductSale = createSelector(
    selectEntities,
    selecSaleInfo,
    (entities, saleInfo) => {
      return Object.keys(saleInfo).map((key, i) => {
        let pr = entities[key];
        let sale = saleInfo[Number(key)];
        return {
          product: pr,
          mont: sale.mont,
          count: sale.count
        };
      });
    }
  );

  return {
    selectCurrentId,
    selectProducts,
    selectTotalProducts,
    selectCurrentProduct,
    selectProductSale
  };
};
