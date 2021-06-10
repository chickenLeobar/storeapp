import { ICategory } from '../models';
import { createAction, props } from '@ngrx/store';

export const addCategory = createAction(
  '[category/api] add category',
  props<{ category: ICategory }>()
);

export const addCategorySuccess = createAction(
  '[category/api] add category success',
  props<{ category: ICategory }>()
);

export const removeCategory = createAction(
  '[category/api] remove category',
  props<{ category: ICategory }>()
);

export const removeCategorySucces = createAction(
  '[category/api] remove category',
  props<{ category: ICategory }>()
);

export const loadCategories = createAction(
  '[category]  load category',
  props<{ query: string }>()
);

export const loadCategoriesSucess = createAction(
  '[category/api]  load category success',
  props<{ categories: ICategory[] }>()
);

export const editCategorie = createAction(
  '[categorie/api]  edit categorie',
  props<{ category: ICategory }>()
);

export const editCategoriesSucess = createAction(
  '[categorie/api]  edit categorie success',
  props<{ category: ICategory }>()
);

export const selectCategory = createAction(
  '[categorie/api] select categorie',
  props<{ id: number }>()
);

export const searchCategorie = createAction(
  '[categorie/api] search categorie',
  props<{ query: string }>()
);
export const searchCategorieSuccess = createAction(
  '[categorie/api] search categorie success',
  props<{ ids: number[] }>()
);
