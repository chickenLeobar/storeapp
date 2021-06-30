import {
  combineReducers,
  ActionReducerMap,
  Action,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as fromAuth from './user.reducer';

export const featureKey = 'auth';

export interface AuthState {
  [fromAuth.featureKey]: fromAuth.State;
}
export interface State extends fromRoot.State {
  [featureKey]: AuthState;
}

const _reducers: ActionReducerMap<AuthState, Action> = {
  [fromAuth.featureKey]: fromAuth.reducer
};

export function reducers(state: AuthState, action: Action) {
  return combineReducers(_reducers)(state, action);
}

const getAuthState = createFeatureSelector<AuthState>(featureKey);

const getAuthUserState = createSelector(
  getAuthState,
  state => state[fromAuth.featureKey]
);

export const authSelectors = fromAuth.getSelectors(getAuthUserState);
