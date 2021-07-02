import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { IUser } from './../models/index';
import {
  createReducer,
  on,
  MemoizedSelector,
  createSelector
} from '@ngrx/store';
import * as authActions from '../actions/auth.actions';
export const featureKey = 'status';

export interface State {
  user: IUser | null;
}

const initialState: State = {
  user: null
};

export const reducer = createReducer(
  initialState,
  on(
    authActions.registerSuccess,
    authActions.loguinSuccess,
    authActions.fetchUserSuccess,
    (state, { user }) => {
      return {
        ...state,
        user
      };
    }
  ),
  on(authActions.logoutUser, state => {
    return {
      ...state,
      user: null
    };
  })
);

export const getSelectors = (
  selectorBase: MemoizedSelector<NzSafeAny, State>
) => {
  const getUser = createSelector(selectorBase, state => {
    return state.user;
  });
  const isUserLoggedIn = createSelector(selectorBase, state => {
    return !!state.user;
  });
  return {
    getUser,
    isUserLoggedIn
  };
};
