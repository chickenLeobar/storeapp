import { IProduct } from './../models/index';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import {
  createReducer,
  createSelector,
  MemoizedSelector,
  on
} from '@ngrx/store';
import produce from 'immer';

export const featureKey = 'sale';
import * as saleActions from '../actions/sale.action';
import { Dictionary } from '@ngrx/entity';

type SaleDetails = Record<number, { mont: number; count: number }>;

export type InfoSale = {
  selectedContact?: number | null;
  date: Date;
};

// type infoSale =  | null;

export interface State {
  // this contact is useful for sale
  info: InfoSale | null;
  saleProducts: SaleDetails;
}

const initialState: State = {
  saleProducts: [],
  info: null
};
// // save sale temporaly in localStorage
// if (localStorage.getItem('sale')) {
//     state = {
//       ...state,
//       saleProducts: JSON.parse(localStorage.getItem('sale') || '')
//     };
//   }
export const reducer = createReducer(
  initialState, // add product for
  on(saleActions.addProductForSale, (state, { product, count }) => {
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
  // remove product of sale
  on(saleActions.removeProducOfsale, (state, { id }) => {
    return produce(state, draf => {
      delete draf.saleProducts[id];
    });
  }),
  // clean sale
  on(saleActions.cleanSale, state => {
    return {
      ...state,
      saleProducts: {}
    };
  }),
  // selected client for sale
  on(saleActions.addInfo, (state, info) => {
    return {
      ...state,
      info: info
    };
  })
);

export const getSelectors = (
  baseSelector: MemoizedSelector<NzSafeAny, State>
) => {
  const selectItemsIdsOfSale = createSelector(
    baseSelector,
    state => state.saleProducts
  );
  const existsProductInsale = (id: number) => {
    return createSelector(selectItemsIdsOfSale, sales => {
      return sales[id] ? true : false;
    });
  };
  // select product of sale

  const selectedInfoOfSale = createSelector(baseSelector, state => state.info);

  return {
    existsProductInsale,
    selectedInfoOfSale,
    selectItemsIdsOfSale
  };
};

export const getFunctions = () => {
  const selectProductSale = (
    entities: Dictionary<IProduct>,
    saleInfo: SaleDetails
  ) => {
    return Object.keys(saleInfo)
      .filter(key => !!saleInfo[Number(key)])
      .map((key, i) => {
        let pr = entities[key];
        let sale = saleInfo[Number(key)];
        return {
          product: pr,
          mont: sale.mont,
          count: sale.count
        };
      });
  };
  return {
    selectProductSale
  };
};
