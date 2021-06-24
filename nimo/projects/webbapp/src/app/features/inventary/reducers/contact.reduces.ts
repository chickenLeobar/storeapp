import { NzSafeAny } from 'ng-zorro-antd/core/types';
import {
  createReducer,
  MemoizedSelector,
  createSelector,
  on
} from '@ngrx/store';
import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import * as contactActions from '../actions/contact.action';
import { IContact } from '../models';

export const featureKey = 'contacts';

export interface State extends EntityState<IContact> {
  selected: number | null;
}

export const adapter: EntityAdapter<IContact> = createEntityAdapter();

const initialState: State = adapter.getInitialState({
  selected: null
});

export const reducer = createReducer(
  initialState,
  // create contact
  on(contactActions.createContactSucess, (state, { contact }) => {
    return adapter.addOne(contact, state);
  }),
  // update contact
  on(contactActions.updateContactSuccess, (state, { contact }) => {
    return adapter.setOne(contact, state);
  }),
  // delete category
  on(contactActions.removeContact, (state, { contact }) => {
    return adapter.removeOne(contact.id, state);
  }),
  // load contacts
  on(contactActions.loadContactsSucess, (state, { contacts }) => {
    return adapter.setAll(contacts, state);
  }),
  //  select contact
  on(contactActions.selectedContact, (state, { contact }) => {
    return {
      ...state,
      selected: contact.id
    };
  })
);

export const getSelectors = (
  baseSelector: MemoizedSelector<NzSafeAny, State>
) => {
  const { selectAll, selectEntities } = adapter.getSelectors(baseSelector);
  const selectWithSearch = createSelector(selectAll, entities => {
    return entities;
  });

  const selectedCurrentId = createSelector(
    baseSelector,
    state => state.selected
  );

  const selectedCurrentContact = createSelector(
    selectEntities,
    selectedCurrentId,
    (entities, currentid) => {
      return currentid != null ? entities[currentid] : null;
    }
  );

  return {
    selectWithSearch,
    selectedCurrentContact
  };
};
