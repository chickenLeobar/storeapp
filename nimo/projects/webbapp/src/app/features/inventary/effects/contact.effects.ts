import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { IContact, TypeContact } from './../models/index';
import { switchMap, map, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import * as contactActions from '../actions/contact.action';
import { ContactService } from '../services/contact.service';
import { State, contactSelectors } from '../reducers';
import { LoadingService } from '../../../core/ui/loading/loading.service';

@Injectable()
export class ContactEffects {
  $loadContacts = createEffect(() =>
    this.actions$.pipe(
      ofType(contactActions.loadContacts),
      switchMap(() =>
        this.contactService
          .getContacts()
          .pipe(
            map(resp => contactActions.loadContactsSucess({ contacts: resp }))
          )
      )
    )
  );

  $saveContact = createEffect(() =>
    this.actions$.pipe(
      ofType(contactActions.createContact),
      switchMap(({ contact }) =>
        this.contactService
          .createContact(contact)
          .pipe(map(contact => contactActions.createContactSucess({ contact })))
      )
    )
  );

  $editContact = createEffect(() =>
    this.actions$.pipe(
      ofType(contactActions.updateContact),
      mergeMap(({ contact }) =>
        this.contactService
          .editContact(contact)
          .pipe(
            map(contact => contactActions.updateContactSuccess({ contact }))
          )
      )
    )
  );

  $removeContact = createEffect(() =>
    this.actions$.pipe(
      ofType(contactActions.removeContact),
      switchMap(({ contact }) =>
        this.contactService
          .deleteContact(contact)
          .pipe(
            map(resp =>
              contactActions.removeContactSucces({ contact: contact })
            )
          )
      )
    )
  );

  $searchContacts = createEffect(() =>
    this.actions$.pipe(
      ofType(contactActions.searchContacts),
      concatLatestFrom(() =>
        this.store.select(contactSelectors.selectAllContacts)
      ),
      map(([{ query, typeContact }, contacts]) => {
        const ids = this.filterContacts(contacts, { query, typeContact });
        console.log(ids);

        let isInitial = true;
        if (query.trim().length != 0) {
          isInitial = false;
        }

        return contactActions.searchContactsSuccess({
          ids: ids,
          isInitial: isInitial
        });
      })
    )
  );

  private filterContacts(
    contacts: IContact[],
    { query, typeContact }: { query: string; typeContact?: TypeContact }
  ) {
    const filters = (contact: IContact) => {
      let shouldBePassed = false;

      if (contact?.type_contact && contact.type_contact == typeContact) {
        shouldBePassed = true;
      }
      const forEvaluate = contact.name.trim().toLocaleLowerCase();

      if (shouldBePassed && query.length != 0) {
        if (forEvaluate.indexOf(query.toLocaleLowerCase()) > 0) {
          shouldBePassed = true;
        } else {
          shouldBePassed = false;
        }
      }

      return shouldBePassed;
    };
    return contacts.filter(filters).map(pr => pr.id);
  }

  $offLoading = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          contactActions.loadContactsSucess,
          contactActions.updateContactSuccess,
          contactActions.removeContactSucces
        ),
        map(() => {
          this.loading.hide();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private contactService: ContactService,
    private store: Store<State>,
    private loading: LoadingService
  ) {}
}
