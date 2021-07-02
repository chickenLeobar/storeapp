import { IContact } from './../../models/index';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { tap, filter, first, switchMap, mergeMap } from 'rxjs/operators';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  EventEmitter
} from '@angular/core';
import { SaleStoreService } from '../../containers/sale/sale.store';
import { ComponentStore } from '@ngrx/component-store';
import { FormBuilder } from '@angular/forms';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { InfoSale } from '../../reducers/sale.reducer';
import { combineLatest } from 'rxjs';
interface localState {
  infoSale: Partial<InfoSale>;
}
import { isNull } from 'lodash';
import { from, Observable, Subject, iif, of } from 'rxjs';

@Component({
  selector: 'leo-display-sale',
  templateUrl: './display-sale.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ComponentStore]
})
@UntilDestroy()
export class DisplaySaleComponent implements OnInit {
  public onInfo = this.compoenentStore
    .select(state => state.infoSale)
    .pipe(filter(d => !isNull(d))) as Observable<InfoSale>;

  public contactCtrl = this.fb.control(null);
  public dateofSale = this.fb.control(new Date());

  constructor(
    private saleStore: SaleStoreService,
    private compoenentStore: ComponentStore<localState>,
    private fb: FormBuilder
  ) {
    this.compoenentStore.setState({
      infoSale: {
        date: new Date()
      }
    });
  }

  private readonly totalAndCount$ = this.saleStore.totalAndCount$;
  private readonly sales$ = this.saleStore.sales$;
  private readonly contacts$ = this.saleStore.contacts$;
  public contactselected!: Observable<IContact>;
  private changueIdContact = new Subject<number | null>();

  public onChangueContact(event: NzSafeAny) {
    this.changueIdContact.next(event);
  }
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
  private updateInfo = this.compoenentStore.updater(
    (state, info: Partial<InfoSale>) => {
      return {
        ...state,
        infoSale: {
          ...state.infoSale,
          ...info
        }
      };
    }
  );

  ngOnInit(): void {
    this.compoenentStore.state$.subscribe(d => {
      console.log(d);
    });
    this.contactselected = this.changueIdContact.pipe(
      switchMap(d => {
        return iif(
          () => d == null,
          of(null),
          this.contacts$.pipe(
            mergeMap(from),
            first(contact => contact.id == d)
          )
        );
      })
    );

    const controls = {
      contact: this.contactCtrl.valueChanges,
      date: this.dateofSale.valueChanges
    };

    combineLatest([controls.contact, controls.date])
      .pipe(untilDestroyed(this))
      .subscribe(([contact, date]) => {
        this.updateInfo({
          date,
          selectedContact: contact
        });
      });
  }
}
