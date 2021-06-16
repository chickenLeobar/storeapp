import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { SaleStoreService } from './sale.store';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'leo-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['../../styles/sale.component.scss'],
  providers: [SaleStoreService],
  encapsulation: ViewEncapsulation.None
})
export class SaleComponent implements OnInit {
  constructor(private state: SaleStoreService, private modal: NzModalService) {}
  ngOnInit(): void {}
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
}
