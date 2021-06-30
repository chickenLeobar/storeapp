import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';

@Injectable()
export class LoadingEffects {
  constructor(private actions$: Actions) {}
}
