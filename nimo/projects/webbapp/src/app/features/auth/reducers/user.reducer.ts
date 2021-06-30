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
  )
);

export const getSelectors = (
  selectorBase: MemoizedSelector<NzSafeAny, State>
) => {
  const getUser = createSelector(selectorBase, state => {
    console.log('state');

    console.log(state);

    return state.user;
  });
  return {
    getUser
  };
};
