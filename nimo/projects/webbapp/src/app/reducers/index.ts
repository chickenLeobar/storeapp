import { InjectionToken } from '@angular/core';
import { ActionReducerMap, Action, createFeatureSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
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

export const selectRouterStore = createFeatureSelector<
  fromRouter.RouterReducerState
>('router');

export const {} = fromRouter.getSelectors(selectRouterStore);
