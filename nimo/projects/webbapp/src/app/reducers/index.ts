import { InjectionToken } from '@angular/core';
import { ActionReducerMap, Action } from '@ngrx/store';

export interface State {}

export const ROOT_REDUCERS = new InjectionToken<
  ActionReducerMap<State, Action>
>('root reducers', {
  factory: () => ({})
});
