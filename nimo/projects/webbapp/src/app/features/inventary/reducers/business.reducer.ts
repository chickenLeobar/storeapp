import {
  createReducer,
  on,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { INegocio } from '../models';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import * as businessActions from '../actions/business.actions';
export const featureKey = 'business';

export const adapter = createEntityAdapter<INegocio>();

export interface State extends EntityState<INegocio> {
  selectedBusiness: number | null;
  businessModal: boolean;
  search: {
    isInitial: boolean;
    ids: number[];
  };
}

const initialState: State = adapter.getInitialState({
  selectedBusiness: null,
  businessModal: false,
  search: {
    isInitial: true,
    ids: []
  }
});

export const reducer = createReducer(
  initialState,
  // load products on store
  on(businessActions.loadAllBusinessSuccess, (state, { negocios }) => {
    return adapter.setAll(negocios, state);
  }),
  // save business on store
  on(businessActions.saveBusinessSucess, (state, { negocio }) => {
    return adapter.addOne(negocio, state);
  }),
  // edit business Success
  on(businessActions.editBusinesSuccess, (state, { negocio }) => {
    return adapter.setOne(negocio, state);
  }),
  // remove business
  on(businessActions.removeBusinesSuccess, (state, { negocio }) => {
    return adapter.removeOne(negocio.id, state);
  }),
  // open modal
  on(businessActions.openModalBusiness, state => {
    return {
      ...state,
      businessModal: true
    };
  }),
  // close modal
  on(businessActions.closeModalBusiness, state => {
    return {
      ...state,
      businessModal: false
    };
  }),
  // selected business
  on(businessActions.selectBusiness, (state, { negocio }) => {
    return {
      ...state,
      selectedBusiness: negocio.id
    };
  }),
  // result of serach
  on(businessActions.searchBusinessSuccess, (state, { ids, isInitial }) => {
    return {
      ...state,
      search: {
        ids: ids,
        isInitial: isInitial
      }
    };
  }),
  on(businessActions.cleanSelectedBusiness, state => {
    return {
      ...state,
      selectedBusiness: null
    };
  })
);

export const getSelectors = (
  selectorBase: MemoizedSelector<NzSafeAny, State>
) => {
  const { selectAll, selectEntities } = adapter.getSelectors(selectorBase);
  const selectSearch = createSelector(selectorBase, state => state.search);

  const selectAllBusiness = createSelector(
    selectAll,
    selectSearch,
    (negocios, search) => {
      if (search.isInitial && search.ids.length == 0) {
        return negocios;
      }

      if (!search.isInitial && search.ids.length == 0) {
        return [];
      }

      return negocios.filter(negocio => {
        if (!negocio.id) {
          return false;
        }
        return (search.ids as number[]).indexOf(negocio.id) >= 0;
      });
    }
  );

  const selectModalState = createSelector(
    selectorBase,
    state => state.businessModal
  );

  const selectCurrentId = createSelector(
    selectorBase,
    state => state.selectedBusiness
  );
  const selectCurrentBusiness = createSelector(
    selectEntities,
    selectCurrentId,
    (entities, id) => {
      return id !== null ? entities[id] : null;
    }
  );

  return {
    selectAllBusiness,
    selectModalState,
    selectCurrentBusiness,
    selectRawBusiness: selectAll
  };
};
