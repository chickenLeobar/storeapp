import {
  Action,
  combineReducers,
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromBrand from '../reducers/brand.reducer';
export const featureKey = 'inventary';

export interface InventaryState {
  [fromBrand.featureKey]: fromBrand.State;
}
export const selectInventaryState = createFeatureSelector<InventaryState>(
  featureKey
);

export interface State extends fromRoot.State {
  [featureKey]: InventaryState;
}

const _reducers: ActionReducerMap<InventaryState, Action> = {
  [fromBrand.featureKey]: fromBrand.reducer
};

export function reducers(state: InventaryState, action: Action) {
  return combineReducers(_reducers)(state, action);
}

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
