import {
  Action,
  combineReducers,
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromBrand from '../reducers/brand.reducer';
import * as fromCateory from './category.reducer';
import * as fromProduct from './product.reducer';
import * as fromBusiness from './business.reducer';
import * as fromContact from './contact.reduces';
import * as fromSale from './sale.reducer';
export const featureKey = 'inventary';

export interface InventaryState {
  [fromBrand.featureKey]: fromBrand.State;
  [fromCateory.featureKey]: fromCateory.State;
  [fromProduct.featureKey]: fromProduct.State;
  [fromBusiness.featureKey]: fromBusiness.State;
  [fromContact.featureKey]: fromContact.State;
  [fromSale.featureKey]: fromSale.State;
}
export const selectInventaryState = createFeatureSelector<InventaryState>(
  featureKey
);

export interface State extends fromRoot.State {
  [featureKey]: InventaryState;
}

const _reducers: ActionReducerMap<InventaryState, Action> = {
  [fromBrand.featureKey]: fromBrand.reducer,
  [fromCateory.featureKey]: fromCateory.reducer,
  [fromProduct.featureKey]: fromProduct.reducer,
  [fromBusiness.featureKey]: fromBusiness.reducer,
  [fromContact.featureKey]: fromContact.reducer,
  [fromSale.featureKey]: fromSale.reducer
};

export function reducers(state: InventaryState, action: Action) {
  return combineReducers(_reducers)(state, action);
}

/*=============================================
=            BRANDS            =
=============================================*/
export const selectBrandState = createSelector<
  State,
  InventaryState,
  fromBrand.State
>(selectInventaryState, (state: InventaryState) => state[fromBrand.featureKey]);

export const {
  selectIds: selectIdsBrand,
  selectAll: selectBrands,
  selectTotal: selectTotalBrands,
  selectEntities: selectEntitiesBrand
} = fromBrand.adapter.getSelectors(selectBrandState);

/*=============================================
=            Category            =
=============================================*/

export const selectCategoryState = createSelector(
  selectInventaryState,
  (state: InventaryState) => state[fromCateory.featureKey]
);

export const {
  selectAll: selectCategories,
  selectTotal: selectTotal,
  selectEntities: selectEntitiesCategory
} = fromCateory.adapter.getSelectors(selectCategoryState);
export const {
  selecCurrentId,
  selectquery,
  selectIds
} = fromCateory.getSelectors(selectCategoryState);

export const selectCurrentCategory = createSelector(
  selectEntitiesCategory,
  selecCurrentId,
  (entites, id) => {
    if (id) {
      return entites[id];
    }
    return null;
  }
);

export const selectAndSearchCategories = createSelector(
  selectCategories,
  selectIds,
  (entities, ids) => {
    if (ids.length == entities.length) {
      return entities;
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

/*=============================================
=            Negocios            =
=============================================*/

export const selectBusinessState = createSelector(
  selectInventaryState,
  state => state[fromBusiness.featureKey]
);

export const {
  selectAllBusiness,
  selectModalState,
  selectCurrentBusiness,
  selectRawBusiness,
  selectedWorkingBusiness
} = fromBusiness.getSelectors(selectBusinessState);

/*=============================================
=            Contact            =
=============================================*/

export const selectContactState = createSelector(
  selectInventaryState,
  state => state[fromContact.featureKey]
);

export const contactSelectors = fromContact.getSelectors(selectContactState);

/*=============================================
=            Products            =
=============================================*/

export const selectProductState = createSelector(
  selectInventaryState,
  state => state[fromProduct.featureKey]
);

export const {
  selectProducts,
  selectTotalProducts,
  selectCurrentProduct,
  selectProductsWithSerach,
  selectedEntitiesProducts
} = fromProduct.getSelectors(selectProductState);

/*=============================================
=            sale            =
=============================================*/

export const selectSaleState = createSelector(
  selectInventaryState,
  state => state[fromSale.featureKey]
);

export const {
  selectedInfoOfSale,
  existsProductInsale,
  selectItemsIdsOfSale
} = fromSale.getSelectors(selectSaleState);

/*=============================================
=            sale <-> product            =
=============================================*/

const { selectProductSale } = fromSale.getFunctions();

export const selectProductsOfSale = createSelector(
  selectedEntitiesProducts,
  selectItemsIdsOfSale,
  selectProductSale
);
