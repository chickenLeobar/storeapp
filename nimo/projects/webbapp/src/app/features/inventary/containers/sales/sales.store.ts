import { switchMap, switchMapTo } from 'rxjs/operators';
import { ISaleShow } from './../../models/index';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { State, selectedWorkingBusiness } from '../../reducers';

interface SalesState {
  sales: ISaleShow[];
}
import { SaleService } from '../../services/sale.service';
@Injectable()
export class SaleStoreService extends ComponentStore<SalesState> {
  constructor(private saleService: SaleService, private store: Store<State>) {
    super({
      sales: []
    });
    this.getSales();
  }

  /*=============================================
  =            Effects            =
  =============================================*/
  private getSales = this.effect(generator => {
    return generator.pipe(
      switchMapTo(this.store.select(selectedWorkingBusiness)),
      switchMap(() => this.saleService.getSales()),
      tapResponse(
        sales => {
          this.setState(state => {
            return {
              ...state,
              sales: sales
            };
          });
        },
        () => {}
      )
    );
  });
  public sales$ = this.select(state => state.sales);

  public vm$ = this.select(this.sales$, sales => {
    return {
      sales
    };
  });
}
