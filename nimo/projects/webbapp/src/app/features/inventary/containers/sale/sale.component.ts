import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { SaleStoreService } from './sale.store';
@Component({
  selector: 'leo-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['../../styles/sale.component.scss'],
  providers: [SaleStoreService],
  encapsulation: ViewEncapsulation.None
})
export class SaleComponent implements OnInit {
  constructor(private state: SaleStoreService) {}

  ngOnInit(): void {}

  public readonly $vm = this.state.$vm;
}
