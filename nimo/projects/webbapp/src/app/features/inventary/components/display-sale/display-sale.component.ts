import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SaleStoreService } from '../../containers/sale/sale.store';
import { ComponentStore } from '@ngrx/component-store';
import { contactSelectors } from '../../reducers';
interface localState {}
@Component({
  selector: 'leo-display-sale',
  templateUrl: './display-sale.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ComponentStore]
})
export class DisplaySaleComponent implements OnInit {
  constructor(
    private saleStore: SaleStoreService,
    private compoenentStore: ComponentStore<localState>
  ) {}
  private readonly totalAndCount$ = this.saleStore.totalAndCount$;
  private readonly sales$ = this.saleStore.sales$;

  private readonly contacts$ = this.saleStore.contacts$;
  // private
  // private readonly contacts$ = this.
  public $vm = this.compoenentStore.select(
    this.totalAndCount$,
    this.sales$,
    this.contacts$,
    (results, sales, contacts) => {
      return {
        results,
        sales,
        contacts
      };
    }
  );

  ngOnInit(): void {}
}
