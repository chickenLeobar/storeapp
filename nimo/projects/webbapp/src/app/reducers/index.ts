import { InjectionToken } from '@angular/core';
import {
  ActionReducerMap,
  Action,
  createFeatureSelector,
  ActionReducer
} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

export interface State {
  router: fromRouter.RouterReducerState;
}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('root reducers', {
  factory: () => ({
    router: fromRouter.routerReducer
  })
});

export function LocalStorageSynReducer(
  reducer: ActionReducer<NzSafeAny>
): ActionReducer<NzSafeAny> {
  return localStorageSync({
    keys: ['inventary'],
    rehydrate: true,
    storageKeySerializer: key => `roesba_${key}`
  })(reducer);
}

export const selectRouterStore = createFeatureSelector<
  fromRouter.RouterReducerState
>('router');

export const metaReducers = [LocalStorageSynReducer];

export const {} = fromRouter.getSelectors(selectRouterStore);
