import { IProduct } from '../models';
import { createAction, props } from '@ngrx/store';

export const addProduct = createAction(
  '[product/api] add product',
  props<{ product: Partial<IProduct> }>()
);
export const addProductSuccess = createAction(
  '[product/api] add product success',
  props<{ product: IProduct }>()
);
export const removeProduct = createAction(
  '[product/api] remove product',
  props<{ product: IProduct }>()
);
export const removeProductSuccess = createAction(
  '[product/api] remove product success',
  props<{ product: IProduct }>()
);

export const loadProducts = createAction('[product/api] load products');
export const loadProductSuccess = createAction(
  '[product/api] load products success',
  props<{ products: IProduct[] }>()
);
export const editProduct = createAction(
  '[product/api] edit product',
  props<{ product: IProduct }>()
);
export const editProductSuccess = createAction(
  '[product/api] edit product success',
  props<{ product: IProduct }>()
);

export const selectProduct = createAction(
  '[product/api] selected product',
  props<{ product: IProduct }>()
);

export const cleanProductId = createAction(
  '[product/api] clean selected product'
);

export const addProductForSale = createAction(
  '[product/api] add product for sale',
  props<{ id: number; mont: number }>()
);
