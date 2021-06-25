import { filter, tap, take } from 'rxjs/operators';
import {
  Component,
  OnInit,
  ViewContainerRef,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BusinessCuComponent } from '../../components/business-cu/business-cu.component';
import { StoreBusinessService } from './business.store';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'leo-business',
  templateUrl: './business.component.html',
  styleUrls: ['../../styles/saleshow.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [StoreBusinessService]
})
@UntilDestroy()
export class BusinessComponent implements OnInit, OnDestroy {
  constructor(
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private businessStore: StoreBusinessService,
    private fb: FormBuilder
  ) {}

  public searchInput = this.fb.control('');

  ngOnDestroy(): void {
    this.modal.openModals.forEach(mod => mod.destroy());
  }
  ngOnInit(): void {
    this.businessStore.modalBuiness$
      .pipe(
        filter(Boolean),
        tap(res => {
          this.openModalBuiness();
        }),
        untilDestroyed(this)
      )
      .subscribe();

    this.searchInput.valueChanges.subscribe(query => {
      this.businessStore.searchBusiness(query);
    });
  }
  public openModalBuiness(): void {
    const ref = this.modal.create({
      nzTitle: 'Negocio',
      nzContent: BusinessCuComponent,
      nzWidth: '600px',
      nzOnOk: () => {},
      nzViewContainerRef: this.viewContainerRef
    });
    ref.afterClose.pipe(take(1)).subscribe(() => {
      this.businessStore.closeModal();
      this.businessStore.cleanBusiness();
    });
  }

  public vm$ = this.businessStore.vm$;
}
