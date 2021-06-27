import { TypeContact } from './../models/index';
import { createAction, props } from '@ngrx/store';
import { IContact } from '../models';

// load

export const loadContacts = createAction('[contacts] load contacts');
export const loadContactsSucess = createAction(
  '[contacts/api] load contacts success',
  props<{ contacts: IContact[] }>()
);

// create

export const createContact = createAction(
  '[contacts] create contact',
  props<{ contact: Partial<IContact> }>()
);
export const createContactSucess = createAction(
  '[contacts/api] create contact Sucess',
  props<{ contact: IContact }>()
);

export const updateContact = createAction(
  '[contacts] update contact',
  props<{ contact: IContact }>()
);

export const updateContactSuccess = createAction(
  '[contacts/api] update contact sucess',
  props<{ contact: IContact }>()
);

export const removeContact = createAction(
  '[contacts] remove contact',
  props<{ contact: IContact }>()
);

export const removeContactSucces = createAction(
  '[contacts] remove contact success',
  props<{ contact: IContact }>()
);

export const selectedContact = createAction(
  '[contacts/api] select contact',
  props<{ contact: IContact }>()
);

export const searchContacts = createAction(
  '[contacts] search contact',
  props<{ query: string; typeContact: TypeContact }>()
);

export const searchContactsSuccess = createAction(
  '[contacts] search contact sucess',
  props<{ ids: number[]; isInitial: boolean }>()
);