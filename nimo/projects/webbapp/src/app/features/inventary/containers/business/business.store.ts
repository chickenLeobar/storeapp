import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { State, selectAllBusiness } from '../../reducers';
import * as productActions from '../../actions/business.actions';
interface BusinessState {}

@Injectable()
export class StoreBusinessService extends ComponentStore<BusinessState> {
  constructor(private store: Store<State>) {
    super({});
    this.store.dispatch(productActions.loadAllBusiness());
  }

  private readonly business$ = this.store.select(selectAllBusiness);

  public vm$ = this.select(this.business$, business => {
    return {
      business
    };
  });
}
