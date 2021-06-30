import { TypeContact } from './../../models/index';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
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
import { LoadingService } from '../../../../core/ui/loading/loading.service';
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

  private typeContactSelected: TypeContact = 'CLIENT';

  constructor(
    private modalService: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private store: Store<State>,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(contactActions.loadContacts());
  }
  public onSearch({ query }: { query: string }): void {
    this.store.dispatch(
      contactActions.searchContacts({
        query,
        typeContact: this.typeContactSelected
      })
    );
  }
  private isContact(source: NzSafeAny): source is IContact {
    return source && 'name' in source;
  }

  public onTypeContact(source: TypeContact): void {
    this.typeContactSelected = source;
    this.store.dispatch(
      contactActions.searchContacts({ query: '', typeContact: source })
    );
  }
  public onEditContact($event: unknown) {
    this.openHandleContact();
  }

  public onDeleteContact(contact: unknown) {
    if (this.isContact(contact)) {
      this.loading.show('Eliminando contacto...');
      this.store.dispatch(contactActions.removeContact({ contact }));
    }
  }

  public openHandleContact(): void {
    const ref = this.modalService.create({
      nzContent: HandleContactComponent,
      nzViewContainerRef: this.viewContainerRef
    });
    this.contact$.pipe(take(1)).subscribe(contact => {
      ref.componentInstance?.addContact(contact);
    });
    ref.componentInstance?.onContactSave.pipe(take(1)).subscribe(val => {
      if ('id' in val) {
        this.loading.show('Editando contacto...');
        this.store.dispatch(
          contactActions.updateContact({ contact: val as NzSafeAny })
        );
      } else {
        this.loading.show('Guardando contacto...');
        this.store.dispatch(contactActions.createContact({ contact: val }));
      }
    });
  }
  public clickCard(contact: IContact) {
    this.store.dispatch(contactActions.selectedContact({ contact }));
  }
}
