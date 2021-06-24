import { switchMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as contactActions from '../actions/contact.action';
import { ContactService } from '../services/contact.service';
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

  constructor(
    private actions$: Actions,
    private contactService: ContactService
  ) {}
}
