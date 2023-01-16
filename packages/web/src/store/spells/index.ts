import { cmsClient } from '@/plugins/http';
import { IGenericQueryParams } from '@/types/GenericStrapiData';
import { IPagination, Pagination } from '@/types/Pagination';
import { Sorting } from '@/types/Sorting';
import { Spell } from '@/types/Spell';
import { ActionContext } from 'vuex';
import { State } from '..';

export interface SpellState {
  spellListPending: boolean;
  spellList: Spell[];
  pagination: Partial<IPagination>;
  sort: {
    current?: Sorting;
    available: Sorting[];
  };
}

const spells = {
  namespaced: true,
  state: () => ({
    spellListPending: false,
    spellList: [],
    pagination: Pagination.default(),
    sort: {
      current: undefined,
      available: new Array<Sorting>(),
    },
  }),
  actions: {
    async fetchSpellList(context: ActionContext<SpellState, State>, params: IGenericQueryParams<Spell>) {
      context.commit('updatePending', true);
      context.commit('updateSpellList', new Array<Spell>());
      if (!params.sort) {
        context.commit('setCurrentSorting');
      }

      try {
        const result = await cmsClient.fetchSpells(params);
        context.commit('updateSpellList', result.data);
        context.commit('updatePagination', result.meta.pagination);
        context.commit('updateAvailableSorting', result.meta.allowedFieldSort);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updatePending', false);
      }
    },
    async fetchMoreSpellList(context: ActionContext<SpellState, State>, params: IGenericQueryParams<Spell>) {
      context.commit('updatePending', true);
      try {
        const calcParams = Object.assign({}, params, context.state.sort.current?.forParams);
        const result = await cmsClient.fetchSpells(calcParams);
        context.commit('updateSpellList', context.state.spellList.concat(result.data));
        context.commit('updatePagination', result.meta.pagination);
        context.commit('updateAvailableSorting', result.meta.allowedFieldSort);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updatePending', false);
      }
    },
  },
  mutations: {
    updatePending(state: SpellState, payload = false) {
      state.spellListPending = payload;
    },
    updateSpellList(state: SpellState, payload: Spell[]) {
      state.spellList = payload;
    },
    updatePagination(state: SpellState, payload: IPagination) {
      state.pagination = new Pagination(payload);
    },
    updateAvailableSorting(state: SpellState, payload: string[]) {
      state.sort.available = payload.reduce((acc, fieldName) => {
        acc.push(new Sorting({ fieldName, direction: 'asc' }));
        acc.push(new Sorting({ fieldName, direction: 'desc' }));
        return acc;
      }, new Array<Sorting>());
    },
    setCurrentSorting(state: SpellState, payload: string) {
      state.sort.current = state.sort.available.find((sort: Sorting) => sort.forParams.sort === payload);
    },
  },
};

export default spells;
