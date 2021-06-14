import { IProduct } from './../../models/index';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'leo-sale-show-products',
  template: `
    <!-- grid products -->
    <div class="sale_products w-100">
      <!-- normal card product -->
      <!--  not image -->
      <leo-product
        [product]="product"
        *ngFor="let product of products"
      ></leo-product>
      <!-- <nz-card
        [nzCover]="covertemplate"
        class="card_product"
        *ngFor="let items of [1, 1, 1, 1]"
        nzHoverable
      >
        <ng-template #covertemplate>
          <img
            src="assets/images/not_found_product.svg"
            alt=""
            style="padding: 10px;"
          />
        </ng-template>
        <h3 nz-typography>Pepsi Cola</h3>
        <p nz-typography>
          Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
        </p>
        <div nz-row class="detail">
          <p nz-col nzSpan="20">
            Venta: Por unidad
          </p>
          <span>
            2$
          </span>
        </div>
      </nz-card> -->
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaleShowProductsComponent implements OnInit {
  @Input() products!: IProduct[];

  constructor() {}

  ngOnInit(): void {
    console.log(this.products);
  }
}
