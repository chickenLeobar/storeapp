import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BusinessCuComponent } from '../../components/business-cu/business-cu.component';
import { StoreBusinessService } from './business.store';

@Component({
  selector: 'leo-business',
  templateUrl: './business.component.html',
  styles: [],
  providers: [StoreBusinessService]
})
export class BusinessComponent implements OnInit, OnDestroy {
  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private businessStore: StoreBusinessService
  ) {}
  ngOnDestroy(): void {
    this.modal.openModals.forEach(mod => mod.destroy());
  }

  ngOnInit(): void {
    // this.openModalBuiness();
    // this.openModalBuiness();
  }
  public openModalBuiness(): void {
    this.modal.create({
      nzTitle: 'Negocio',
      nzContent: BusinessCuComponent,
      nzWidth: '600px',
      nzOnOk: () => {},
      nzViewContainerRef: this.viewContainerRef
    });
  }

  public vm$ = this.businessStore.vm$;
}
