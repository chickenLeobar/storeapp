import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { createReducer, MemoizedSelector, createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { IContact } from '../models';
export const featureKey = 'contacts';

export interface State extends EntityState<IContact> {}

export const adapter: EntityAdapter<IContact> = createEntityAdapter();

const initialState: State = adapter.getInitialState();

export const reducer = createReducer(initialState);

export const getSelectors = (
  baseSelector: MemoizedSelector<NzSafeAny, State>
) => {
  const { selectAll } = adapter.getSelectors(baseSelector);
  const selectWithSearch = createSelector(selectAll, entities => {
    return entities;
  });
  return {
    selectWithSearch
  };
};
