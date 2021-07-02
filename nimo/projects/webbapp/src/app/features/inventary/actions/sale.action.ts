import { IProduct } from './../models/index';
import { createAction, props } from '@ngrx/store';
import { InfoSale } from '../reducers/sale.reducer';
export const addInfo = createAction(
  '[sale] selected client',
  props<InfoSale>()
);

export const removeProducOfsale = createAction(
  '[product/api] remove product of sale',
  props<{ id: number }>()
);

// clean sale
export const cleanSale = createAction('[product/api] clean sale');

// save sale on server
export const saveSale = createAction('[product/api] save sale');
export const addProductForSale = createAction(
  '[product/api] add product for sale',
  props<{ product: IProduct; count: number }>()
);
