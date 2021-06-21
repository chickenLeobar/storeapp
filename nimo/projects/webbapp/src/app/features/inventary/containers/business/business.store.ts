import { INegocio } from './../../models/index';
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { State, selectAllBusiness, selectModalState } from '../../reducers';
import * as businessActions from '../../actions/business.actions';
interface BusinessState {}

@Injectable()
export class StoreBusinessService extends ComponentStore<BusinessState> {
  constructor(private store: Store<State>) {
    super({});
    this.store.dispatch(businessActions.loadAllBusiness());
  }

  private readonly business$ = this.store.select(selectAllBusiness);

  public readonly modalBuiness$ = this.store.select(selectModalState);

  public vm$ = this.select(this.business$, business => {
    return {
      business
    };
  });

  public closeModal(): void {
    this.store.dispatch(businessActions.closeModalBusiness());
  }
  public deleteBusiness(deal: INegocio): void {
    this.store.dispatch(businessActions.removeBusiness({ negocio: deal }));
  }

  // edit business
  public editBusiness(deal: INegocio): void {
    this.store.dispatch(businessActions.selectBusiness({ negocio: deal }));
    this.store.dispatch(businessActions.openModalBusiness());
  }

  // search business

  public searchBusiness(query: string): void {
    this.store.dispatch(businessActions.searchBusiness({ query }));
  }
}
