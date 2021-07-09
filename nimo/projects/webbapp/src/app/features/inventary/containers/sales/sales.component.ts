import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SaleStoreService } from './sales.store';
@Component({
  selector: 'leo-sales',
  templateUrl: './sales.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SaleStoreService]
})
export class SalesComponent implements OnInit {
  mode = 'date';
  constructor(private storeLocal: SaleStoreService) {}

  ngOnInit(): void {}

  public vm$ = this.storeLocal.vm$;
}
