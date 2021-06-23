import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';

@Injectable()
export class ContactEffects {
  constructor(private actions$: Actions) {}
}
