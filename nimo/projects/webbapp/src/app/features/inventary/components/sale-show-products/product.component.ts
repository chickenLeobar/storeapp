import { HandleCountMode } from './../../libs/HandleCountMode';
import { IProduct } from './../../models/index';
import { Store } from '@ngrx/store';
import { State } from '../,,/../../reducers';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  HostListener
} from '@angular/core';
import * as saleActions from '../../actions/sale.action';
import { existsProductInsale } from '../../reducers';
import { take, tap } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd/message';
import { get } from 'lodash';
@Component({
  selector: 'leo-product',
  template: `
    <nz-card [nzCover]="covertemplate" class="card_product" nzHoverable>
      <ng-template #covertemplate>
        <div class="image_preview">
          <img
            class=""
            [src]="image"
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
        </div>
      </ng-template>
      <h3 nz-typography>{{ product.name }}</h3>
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
  constructor(
    public countMode: HandleCountMode,
    private store: Store<State>,
    private messageService: NzMessageService
  ) {}

  @HostListener('dblclick')
  selectProduct() {
    this.store
      .select(existsProductInsale(get(this.product, 'id', -1)))
      .pipe(
        take(1),
        tap(res => {
          if (res) {
            this.messageService.error('Esto producto ya existe en la venta');
          } else {
            if (this.product)
              this.store.dispatch(
                saleActions.addProductForSale({
                  product: this.product,
                  count: 0
                })
              );
          }
        })
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.countMode.changueMode(this.product.method_cont);
  }

  public get image() {
    return get(
      this.product,
      'images[0].url',
      'assets/images/not_found_product.svg'
    );
  }
  public get imageFound() {
    return get(this.product, 'images[0].url', undefined);
  }
}
