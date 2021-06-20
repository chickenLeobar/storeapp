import { IProduct } from './../../models/index';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  Input
} from '@angular/core';

@Component({
  selector: 'leo-sale-show-products',
  template: `
    <!-- grid products -->
    <div class="sale_products w-100" [ngClass]="{ empty: isEmpty }">
      <!-- normal card product -->
      <leo-product
        [product]="product"
        *ngFor="let product of products"
      ></leo-product>
      <!-- empty -->
      <div class="empty_sale" *ngIf="isEmpty">
        <ng-template #imageNotFound>
          <leo-empty-default></leo-empty-default>
        </ng-template>
        <nz-empty [nzNotFoundImage]="imageNotFound"> </nz-empty>
      </div>
    </div>
  `,
  styleUrls: [`../../styles/saleshow.component.scss`],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaleShowProductsComponent implements OnInit {
  @Input() products!: IProduct[];

  constructor() {}

  get isEmpty() {
    return this.products.length == 0;
  }

  ngOnInit(): void {}
}
