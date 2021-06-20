import { IProduct } from './../../models/index';
import { map, debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  EventEmitter
} from '@angular/core';
import { ISaleItem } from './sale-products.component';
import { HandleCountMode } from '../../libs';
@Component({
  selector: 'leo-item-sale',
  template: `
    <nz-list-item class="item">
      <!-- meta -->
      <nz-list-item-meta [nzDescription]="description">
        <nz-list-item-meta-title>
          <p class="price">
            {{ item.mont }}
          </p>
        </nz-list-item-meta-title>
      </nz-list-item-meta>
      <!-- actions -->
      <ul nz-list-item-actions class="px-2">
        <nz-list-item-action>
          <nz-input-number
            [nzMin]="0"
            (ngModelChange)="changueValue()"
            [formControl]="countField"
          ></nz-input-number>
          <b class="unity px-2"> {{ countMode.letterIdentifier }} </b>
          <button
            nz-button
            nzDanger
            nzType="primary"
            (click)="removeItem.emit(item)"
            class="close_button"
          >
            <i nz-icon nzType="close" nzTheme="outline"></i>
          </button>
        </nz-list-item-action>
      </ul>
      <!-- templates -->
      <ng-template #description>
        <h2 class="title">
          {{ item.product?.name }}
        </h2>
      </ng-template>
    </nz-list-item>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemSaleComponent implements OnInit {
  @Input() item!: ISaleItem;

  countField: FormControl = new FormControl(0);
  @Output() readonly saleItem = new EventEmitter<{
    product: IProduct | undefined;
    count: number;
  }>();

  @Output() readonly removeItem = new EventEmitter<ISaleItem>();

  constructor(public countMode: HandleCountMode) {}

  ngOnInit(): void {
    this.countField.setValue(this.item?.count);
    this.item.product?.method_cont &&
      this.countMode.changueMode(this.item.product?.method_cont);
  }
  changueValue() {
    this.saleItem.emit({
      product: this.item.product,
      count: this.countField.value
    });
  }
}
