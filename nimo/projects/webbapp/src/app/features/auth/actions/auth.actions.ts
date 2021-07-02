import { createAction, props } from '@ngrx/store';
import { IUser } from '../models';
// loguin action

export const loguin = createAction(
  '[auth/api] loguin',
  props<{ email: string; password: string }>()
);
export const loguinSuccess = createAction(
  '[auth] loguin ',
  props<{ user: IUser }>()
);

export const register = createAction(
  '[auth/api]  register',
  props<{ user: Partial<IUser> }>()
);
export const registerSuccess = createAction(
  '[auth]  register',
  props<{ user: IUser }>()
);

export const comproateCode = createAction(
  '[auth] comprobate code',
  props<{ code: string }>()
);

export const fetchUser = createAction(
  '[auth/api] fetch user',
  props<{ id: number }>()
);

export const fetchUserSuccess = createAction(
  '[auth/api]  fetch user succes',
  props<{ user: IUser }>()
);

export const logoutUser = createAction('[auth] logout');
