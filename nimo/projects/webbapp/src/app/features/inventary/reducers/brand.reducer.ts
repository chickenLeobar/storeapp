import { IBrand } from './../models/index';
import { createReducer, on, createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as actions from '../actions/brand.actions';
export const featureKey = 'brand';

export const adapter: EntityAdapter<IBrand> = createEntityAdapter();

export interface State extends EntityState<IBrand> {
  selectedId: number | null;
}

const initialState: State = adapter.getInitialState({
  selectedId: null
});

export const reducer = createReducer(
  initialState,
  // addd brand
  on(actions.addBrandSuccess, (state, { brand }) => {
    return adapter.addOne(brand, state);
  }),
  // remove brand
  on(actions.removeBrand, (state, { brand }) => {
    if (!brand.id) {
      return state;
    }
    return adapter.removeOne(brand.id, state);
  }),
  // add brands
  on(actions.loadBrandsSucces, (state, { brands }) => {
    return adapter.setAll(brands, state);
  }),
  // delete brand
  on(actions.deleteBrandSuccess, (state, { brand }) => {
    if (!brand.id) {
      return state;
    }
    return adapter.removeOne(brand.id, state);
  }),
  // edit brand
  on(actions.editBrandSuccess, (state, { brand }) => {
    return adapter.setOne(brand, state);
  })
);
