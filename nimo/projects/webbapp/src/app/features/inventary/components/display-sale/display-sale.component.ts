import {
  ChangeDetectionStrategy,
  Component,
  Optional,
  OnInit,
  Inject,
  SkipSelf,
  Host
} from '@angular/core';
import { SaleStoreService } from '../../containers/sale/sale.store';
import { ComponentStore } from '@ngrx/component-store';
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
  public $vm = this.compoenentStore.select(
    this.totalAndCount$,
    this.sales$,
    (results, sales) => {
      return {
        results,
        sales
      };
    }
  );

  ngOnInit(): void {}
}
