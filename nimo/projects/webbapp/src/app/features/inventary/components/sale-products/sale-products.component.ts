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
import * as saleActions from '../../actions/sale.action';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
export interface ISaleItem {
  product?: IProduct;
  count: number;
  mont: number;
}

@Component({
  selector: 'leo-sale-products',
  template: `
    <nz-list
      class="products_list"
      cdkDropList
      [cdkDropListData]="sales"
      (cdkDropListDropped)="drop($event)"
    >
      <leo-item-sale
        cdkDrag
        (removeItem)="removeItem($event)"
        (saleItem)="onSale($event)"
        [item]="item"
        *ngFor="let item of sales"
      ></leo-item-sale>
      <ng-template #notFound>
        <le-product-empty [width]="350"></le-product-empty>
        <p>No se han agregado productos</p>
      </ng-template>
      <nz-list-empty
        *ngIf="sales.length == 0"
        [nzNoResult]="notFound"
      ></nz-list-empty>
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

  // controle drag
  public drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }

  constructor(private store: Store<State>) {}

  ngOnInit(): void {}

  public onSale(event: { product: IProduct | undefined; count: number }): void {
    if (event.product)
      this.store.dispatch(
        saleActions.addProductForSale({
          product: event.product,
          count: event.count
        })
      );
  }

  public removeItem(saleItem: ISaleItem) {
    if (saleItem.product?.id)
      this.store.dispatch(
        saleActions.removeProducOfsale({ id: saleItem.product?.id })
      );
  }
}
