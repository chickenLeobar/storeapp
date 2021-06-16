import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { ICategory } from '../models';
import {
  createReducer,
  on,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as categoryActions from '../actions/category.actions';
export const featureKey = 'category';

export const adapter: EntityAdapter<ICategory> = createEntityAdapter();

export interface State extends EntityState<ICategory> {
  selectId: number | null;
  selectIds: number[];
  query: string | null;
}

const initialState: State = adapter.getInitialState({
  selectId: null,
  selectIds: [],
  query: ''
});

export const reducer = createReducer(
  initialState,
  //  add categorie
  on(categoryActions.addCategorySuccess, (state, { category }) => {
    return adapter.addOne(category, state);
  }),
  //  add categories
  on(categoryActions.loadCategoriesSucess, (state, { categories }) => {
    return adapter.setAll(categories, state);
  }),
  // delete category
  on(categoryActions.removeCategory, (state, { category }) => {
    if (!category.id) {
      return state;
    }
    return adapter.removeOne(category.id, state);
  }),
  // edit category
  on(categoryActions.editCategoriesSucess, (state, { category }) => {
    return adapter.setOne(category, state);
  }),
  // select category
  on(categoryActions.selectCategory, (state, { id }) => {
    return {
      ...state,
      selectId: id
    };
  }),
  // result of search
  on(categoryActions.searchCategorieSuccess, (state, { ids }) => {
    return {
      ...state,
      selectIds: ids
    };
  })
);

export const getSelectors = (
  selectorBase: MemoizedSelector<NzSafeAny, State>
) => {
  const selecCurrentId = createSelector(selectorBase, state => state.selectId);
  const selectquery = createSelector(selectorBase, state => state.query);
  const selectIds = createSelector(selectorBase, state => state.selectIds);
  return {
    selecCurrentId,
    selectquery,
    selectIds
  };
};
