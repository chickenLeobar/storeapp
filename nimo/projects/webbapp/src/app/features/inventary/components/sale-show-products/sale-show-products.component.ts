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
    <div class="sale_products w-100">
      <!-- normal card product -->
      <!--  not image -->
      <leo-product
        [product]="product"
        *ngFor="let product of products"
      ></leo-product>
    </div>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaleShowProductsComponent implements OnInit {
  @Input() products!: IProduct[];

  constructor() {}

  ngOnInit(): void {}
}
