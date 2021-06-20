import {
  createReducer,
  on,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { INegocio } from '../models';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as businessActions from '../actions/business.actions';
export const featureKey = 'business';

export const adapter = createEntityAdapter<INegocio>();

export interface State extends EntityState<INegocio> {
  selectedBusiness: number | null;
}

const initialState: State = adapter.getInitialState({
  selectedBusiness: null
});

export const reducer = createReducer(
  initialState,
  // load products on store
  on(businessActions.loadAllBusinessSuccess, (state, { negocios }) => {
    return adapter.setAll(negocios, state);
  }),
  // save business on store
  on(businessActions.saveBusinessSucess, (state, { negocio }) => {
    return adapter.addOne(negocio, state);
  }),
  // edit business Success
  on(businessActions.editBusinesSuccess, (state, { negocio }) => {
    return adapter.setOne(negocio, state);
  }),
  // remove business
  on(businessActions.removeBusinesSuccess, (state, { negocio }) => {
    return adapter.removeOne(negocio.id, state);
  })
);

export const getSelectors = (
  selectorBase: MemoizedSelector<NzSafeAny, State>
) => {
  const { selectAll } = adapter.getSelectors(selectorBase);
  const selectAllBusiness = createSelector(selectAll, negocios => negocios);

  return {
    selectAllBusiness
  };
};
