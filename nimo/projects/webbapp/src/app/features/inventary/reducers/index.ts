import { Action, combineReducers, ActionReducerMap } from '@ngrx/store';

export const featureKey = 'inventary';

export interface InventaryState {}

const _reducers: ActionReducerMap<InventaryState, Action> = {};

export function reducers(state: InventaryState, action: Action) {
  return combineReducers(_reducers)(state, action);
}
