import { State, selectCategories } from './../reducers/index';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import {
  switchMap,
  map,
  concatMap,
  exhaustMap,
  mergeMap
} from 'rxjs/operators';
import * as categoryActions from '../actions/category.actions';
import { CategoryService } from '../services/category.service';
@Injectable()
export class CategoryEffects {
  $loadCategories = createEffect(() => {
    return this.actions$.pipe(ofType(categoryActions.loadCategories)).pipe(
      switchMap(action => {
        return this.categorieService
          .getCategories(action.query)
          .pipe(
            map(data =>
              categoryActions.loadCategoriesSucess({ categories: data })
            )
          );
      })
    );
  });

  $addCategorie = createEffect(() =>
    this.actions$.pipe(ofType(categoryActions.addCategory)).pipe(
      concatMap(action =>
        this.categorieService.createCategory(action.category).pipe(
          map(data => {
            return categoryActions.addCategorySuccess({ category: data });
          })
        )
      )
    )
  );

  $deleteCategory = createEffect(() =>
    this.actions$.pipe(ofType(categoryActions.removeCategory)).pipe(
      exhaustMap(action =>
        this.categorieService.deleteCategory(action.category.id || -1).pipe(
          map(data => {
            return categoryActions.removeCategorySucces({
              category: action.category
            });
          })
        )
      )
    )
  );

  $editCategory = createEffect(() =>
    this.actions$
      .pipe(ofType(categoryActions.editCategorie))
      .pipe(
        mergeMap(action =>
          this.categorieService
            .editCategorie(action.category)
            .pipe(
              map(data =>
                categoryActions.editCategoriesSucess({ category: data })
              )
            )
        )
      )
  );

  $searchCategories = createEffect(() =>
    this.actions$.pipe(ofType(categoryActions.searchCategorie)).pipe(
      concatLatestFrom(() => this.store.select(selectCategories)),
      map(([{ query }, categories]) => {
        const ids: number[] = categories
          .filter(val => {
            return (
              val.name.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) >=
              0
            );
          })
          .map(val => val.id) as number[];
        return categoryActions.searchCategorieSuccess({
          ids: ids
        });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private categorieService: CategoryService,
    private store: Store<State>
  ) {}
}
