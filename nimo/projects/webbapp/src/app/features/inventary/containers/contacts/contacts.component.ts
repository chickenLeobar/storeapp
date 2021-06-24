import { IContact } from './../../models';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HandleContactComponent } from '../../components/contacts/handle-contact/handle-contact.component';
import { Store } from '@ngrx/store';
import { State, contactSelectors } from '../../reducers';
import * as contactActions from '../../actions/contact.action';
import { take } from 'rxjs/operators';
@Component({
  selector: 'leo-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['../../styles/contact.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent implements OnInit {
  contacts$ = this.store.select(contactSelectors.selectWithSearch);
  contact$ = this.store.select(contactSelectors.selectedCurrentContact);
  constructor(
    private modalService: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(contactActions.loadContacts());
  }

  public openHandleContact(): void {
    const ref = this.modalService.create({
      nzContent: HandleContactComponent,
      nzViewContainerRef: this.viewContainerRef
    });
    ref.componentInstance?.onContactSave.pipe(take(1)).subscribe(val => {
      this.store.dispatch(contactActions.createContact({ contact: val }));
    });
  }
  public clickCard(contact: IContact) {
    this.store.dispatch(contactActions.selectedContact({ contact }));
  }
}
