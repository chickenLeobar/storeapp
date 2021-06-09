import { IBrand } from './../models/index';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as brandActions from '../actions/brand.actions';
import {
  switchMap,
  map,
  concatMap,
  exhaustMap,
  tap,
  mergeMap
} from 'rxjs/operators';
import { BrandService } from '../services/brand.service';

@Injectable()
export class BrandEffects {
  $loadBrands = createEffect(() =>
    this.actions$.pipe(
      ofType(brandActions.loadBrands),
      switchMap(payload =>
        this.brandService.getBrands(payload?.query || '').pipe(
          map(nodes => {
            return brandActions.loadBrandsSucces({ brands: nodes });
          })
        )
      )
    )
  );

  $addBrand = createEffect(() =>
    this.actions$.pipe(
      ofType(brandActions.addBrand),
      concatMap(payload => {
        return this.brandService.createBrand(payload.brand).pipe(
          map(node => {
            return brandActions.addBrandSuccess({ brand: node });
          })
        );
      })
    )
  );

  $deleteBrand = createEffect(() =>
    this.actions$.pipe(ofType(brandActions.deleteBrand)).pipe(
      exhaustMap(action => {
        const brand = action.brand.id;
        return this.brandService.deleteBrand(brand || -1).pipe(
          map(_ => {
            return brandActions.deleteBrandSuccess({ brand: action.brand });
          })
        );
      })
    )
  );

  $editBrand = createEffect(() =>
    this.actions$.pipe(ofType(brandActions.editBrand)).pipe(
      mergeMap(action => {
        return this.brandService.editBrand(action.brand).pipe(
          map(response => {
            return brandActions.editBrandSuccess({ brand: response as IBrand });
          })
        );
      })
    )
  );

  constructor(private actions$: Actions, private brandService: BrandService) {}
}
