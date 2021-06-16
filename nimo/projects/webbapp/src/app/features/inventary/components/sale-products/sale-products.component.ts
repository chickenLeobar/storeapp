import { IProduct } from './../../models/index';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  ViewEncapsulation
} from '@angular/core';

import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import * as productActions from '../../actions/product.actionts';
export interface ISaleItem {
  product?: IProduct;
  count: number;
  mont: number;
}

@Component({
  selector: 'leo-sale-products',
  template: `
    <nz-list class="products_list">
      <leo-item-sale
        (saleItem)="onSale($event)"
        [item]="item"
        *ngFor="let item of sales"
      ></leo-item-sale>
    </nz-list>

    <!-- monts-->
    <div class="monts">
      <p class="count">Cantidad : {{ totalAndCount?.count }}</p>
      <p class="total">Total: {{ totalAndCount?.mont }}</p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaleProductsComponent implements OnInit {
  @Input() sales!: ISaleItem[];

  @Input() totalAndCount!: { count: number; mont: number };

  constructor(private store: Store<State>) {}

  ngOnInit(): void {}

  public onSale(event: { product: IProduct | undefined; count: number }): void {
    if (event.product) {
      this.store.dispatch(
        productActions.addProductForSale({
          product: event.product,
          count: event.count
        })
      );
    }
  }
}
