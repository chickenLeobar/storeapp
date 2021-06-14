import { HandleCountMode } from './../../libs/HandleCountMode';
import { IProduct } from './../../models/index';

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'leo-product',
  template: `
    <nz-card [nzCover]="covertemplate" class="card_product" nzHoverable>
      <ng-template #covertemplate>
        <img
          src="assets/images/pepsi.png"
          *ngIf="imageFound; else notFoundImage"
          alt=""
          style="padding: 10px;"
        />
        <ng-template #notFoundImage>
          <img
            src="assets/images/not_found_product.svg"
            alt=""
            style="padding: 10px;"
          />
        </ng-template>
      </ng-template>
      <h3 nz-typography>Pepsi Cola</h3>
      <p nz-typography class="description">
        {{ product.description | slice: 0:20 }}
      </p>
      <div nz-row class="detail">
        <p nz-col nzSpan="18">Venta: {{ countMode.saleLabel }}</p>
        <span nz-col nzSpan="4" *ngIf="countMode.stockVisible">
          {{ product?.mont_exist }}
        </span>
      </div>
    </nz-card>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HandleCountMode]
})
export class ProductComponent implements OnInit {
  private _product!: IProduct;
  @Input() set product(v: IProduct) {
    this._product = v;
  }
  get product() {
    return this._product;
  }
  constructor(public countMode: HandleCountMode) {}

  ngOnInit(): void {
    this.countMode.changueMode(this.product.method_cont);
  }
  public get imageFound() {
    return false;
  }
}
