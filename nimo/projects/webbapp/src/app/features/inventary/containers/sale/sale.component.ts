import { ContainerMode } from './../../../../theme/layouts/container/container.component';
import { Store } from '@ngrx/store';
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewContainerRef
} from '@angular/core';
import { SaleStoreService } from './sale.store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { State } from '../../reducers/index';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { isArray } from 'lodash';
import { searchProducts } from '../../actions/product.actionts';
import { DisplaySaleComponent } from '../../components/display-sale/display-sale.component';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import * as saleActions from '../../actions/sale.action';
@Component({
  selector: 'leo-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['../../styles/sale.component.scss'],
  providers: [SaleStoreService],
  encapsulation: ViewEncapsulation.None
})
@UntilDestroy()
export class SaleComponent implements OnInit {
  // form query
  public searchForm: FormGroup = new FormGroup({
    brand: this.fb.control([]),
    category: this.fb.control([]),
    query: this.fb.control('')
  });

  constructor(
    private state: SaleStoreService,
    private modal: NzModalService,
    private store: Store<State>,
    private fb: FormBuilder,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.listenFilters();
    // this.modalDisplaySale();
  }
  private listenFilters(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(200), untilDestroyed(this))
      .subscribe(val => {
        let filters = { category: -1, brand: -1, query: '' } as {
          category?: number;
          brand?: number;
          query?: string;
        };
        if (!isArray(val['category'])) {
          filters.category = val['category'];
        }
        if (!isArray(val['brand'])) {
          filters.brand = val['brand'];
        }
        filters.query = val['query'];
        this.store.dispatch(searchProducts(filters));
      });
  }
  public readonly $vm = this.state.$vm;

  public cancelSale() {
    this.modal.confirm({
      nzTitle: 'Cancelar Venta',
      nzContent: '¿Desea cancelar esta venta?',
      nzOnOk: () => {
        this.state.cancelSale();
      }
    });
  }
  public saveSale() {
    this.modalDisplaySale();
  }

  private modalDisplaySale() {
    const refModal = this.modal.create({
      nzTitle: 'Detalle de venta',
      nzContent: DisplaySaleComponent,
      nzWidth: '800px',
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => {
        this.state.saveSale();
      }
    });

    refModal.componentInstance?.onInfo
      .pipe(untilDestroyed(this))
      .subscribe(info => {
        this.store.dispatch(saleActions.addInfo(info));
      });
  }
}
