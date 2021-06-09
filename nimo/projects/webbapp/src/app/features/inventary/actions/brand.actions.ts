import { IBrand } from '../models';
import { createAction, props } from '@ngrx/store';

export const addBrand = createAction(
  '[brand/api] add brand',
  props<{ brand: IBrand }>()
);

export const addBrandSuccess = createAction(
  '[brand/api] add brand succes',
  props<{ brand: IBrand }>()
);

export const removeBrand = createAction(
  '[brand/api] remove brand',
  props<{ brand: IBrand }>()
);

export const loadBrands = createAction(
  '[brand/api]  load brands',
  props<{ query?: string }>()
);

export const loadBrandsSucces = createAction(
  '[brand/api] load brands succes',
  props<{ brands: IBrand[] }>()
);

export const deleteBrand = createAction(
  '[brand/api] delete brand',
  props<{ brand: IBrand }>()
);

export const deleteBrandSuccess = createAction(
  '[brand/api]  delete bran sucess',
  props<{ brand: IBrand }>()
);

export const editBrand = createAction(
  '[brand/api] edit brand',
  props<{ brand: IBrand }>()
);

export const editBrandSuccess = createAction(
  '[brand/api]  edit brand success',
  props<{ brand: IBrand }>()
);
