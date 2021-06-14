import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'leo-sale-products',
  template: `
    <nz-list class="products_list">
      <nz-list-item *ngFor="let item of [1]">
        <!-- meta -->
        <nz-list-item-meta [nzDescription]="description">
          <nz-list-item-meta-title>
            <p class="price">
              15$
            </p>
          </nz-list-item-meta-title>

          >
        </nz-list-item-meta>
        <!-- actions -->
        <ul nz-list-item-actions class="px-2">
          <nz-list-item-action>
            <nz-input-number></nz-input-number>
            <b class="unity px-2">M </b>
          </nz-list-item-action>
        </ul>
        <!-- templates -->
        <ng-template #description>
          <h2 class="title">
            Pepsi Cola
          </h2>
        </ng-template>
      </nz-list-item>
    </nz-list>
    <!-- monts-->
    <div class="monts">
      <p class="count">
        Cantidad : 18
      </p>
      <p class="total">
        Total: 100 $
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SaleProductsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
