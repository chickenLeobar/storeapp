import { createAction, props } from '@ngrx/store';
import { INegocio } from '../models';

export const loadAllBusiness = createAction('[business/api] load all business');
export const loadAllBusinessSuccess = createAction(
  '[business/api] load all sucess',
  props<{ negocios: INegocio[] }>()
);

export const saveBusiness = createAction(
  '[business/api] save negocio',
  props<{ negocio: Partial<INegocio> }>()
);
export const saveBusinessSucess = createAction(
  '[business/api] save negocio sucess',
  props<{ negocio: INegocio }>()
);

export const editBusiness = createAction(
  '[business/api] save negocio sucess',
  props<{ negocio: INegocio }>()
);

export const editBusinesSuccess = createAction(
  '[business/api] save negocio sucess',
  props<{ negocio: INegocio }>()
);
export const removeBusiness = createAction(
  '[business/api] remove negocio sucess',
  props<{ negocio: INegocio }>()
);

export const removeBusinesSuccess = createAction(
  '[business/api] remove negocio sucess',
  props<{ negocio: INegocio }>()
);

export const selectBusiness = createAction(
  '[business/api] select business',
  props<{ negocio: INegocio }>()
);
