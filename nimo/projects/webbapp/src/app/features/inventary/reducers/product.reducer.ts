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

import { filtersAreDirty } from 'shared';

export const featureKey = 'product';

export const adapter: EntityAdapter<IProduct> = createEntityAdapter();

export interface State extends EntityState<IProduct> {
  selectId: number | null;
  saleProducts: Record<number, { mont: number; count: number }>;
  searchProducts: number[];
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
    // FIXME:
    // save sale temporaly in localStorage
    if (localStorage.getItem('sale')) {
      state = {
        ...state,
        saleProducts: JSON.parse(localStorage.getItem('sale') || '')
      };
    }
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
      // // FIXME:
      // // save sale temporaly in localStorage
      localStorage.setItem(
        'sale',
        JSON.stringify(Object.assign({}, state.saleProducts))
      );
    });
  }),
  // clean sale
  on(productActions.cleanSale, state => {
    return {
      ...state,
      saleProducts: {}
    };
  }),
  // search values
  on(productActions.searchProductsSuccess, (state, { ids }) => {
    return {
      ...state,
      searchProducts: ids
    };
  }),
  // remove product of sale
  on(productActions.removeProducOfsale, (state, { id }) => {
    return produce(state, draf => {
      delete draf.saleProducts[id];
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

  const selecSaleInfo = createSelector(
    selectorBase,
    state => state.saleProducts
  );

  const selectCurrentProduct = createSelector(
    selectCurrentId,
    selectEntities,
    (id, entities) => (id ? entities[id] : null)
  );

  const existsProductInsale = (id: number) => {
    return createSelector(selecSaleInfo, sales => {
      return sales[id] ? true : false;
    });
  };

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
    selectProductSale,
    selectProductsWithSerach,
    existsProductInsale
  };
};
