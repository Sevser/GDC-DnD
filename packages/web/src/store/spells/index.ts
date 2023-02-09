import { cmsClient } from '@/plugins/http';
import { IGenericQueryParams } from '@/types/GenericStrapiData';
import { IPagination, Pagination } from '@/types/Pagination';
import { Sorting } from '@/types/Sorting';
import { ISpellFilters, Spell, SpellFilters } from '@/types/Spell/Spell';
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
  filters: ISpellFilters;
  spell?: Spell;
  spellPending: boolean;
}

const spells = {
  namespaced: true,
  state: (): SpellState => ({
    spellListPending: false,
    spellList: [],
    pagination: Pagination.default(),
    sort: {
      current: undefined,
      available: new Array<Sorting>(),
    },
    filters: {},
    spell: undefined,
    spellPending: false,
  }),
  actions: {
    async fetchSpell(context: ActionContext<SpellState, State>, spellId: number | string) {
      context.commit('updateSpellPending', true);
      context.commit('updateSpell');
      try {
        const spell = await cmsClient.fetchSpell(spellId);
        context.commit('updateSpell', spell);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch (e) {
      } finally {
        context.commit('updateSpellPending', false);
      }
    },
    async fetchSpellList(context: ActionContext<SpellState, State>, params: IGenericQueryParams<Spell>) {
      context.commit('updateSpellListPending', true);
      context.commit('updateSpellList', new Array<Spell>());
      if (!params.sort) {
        context.commit('setCurrentSorting');
      }

      if (!params.filters) {
        params.filters = new SpellFilters(context.state.filters).forParams;
      } else {
        context.commit('setCurrentFilters', params.filters);
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
        context.commit('updateSpellListPending', false);
      }
    },
    async fetchMoreSpellList(context: ActionContext<SpellState, State>, params: IGenericQueryParams<Spell>) {
      context.commit('updateSpellListPending', true);
      try {
        const calcParams = Object.assign({}, params, context.state.sort.current?.forParams, new SpellFilters(context.state.filters).forParams);
        const result = await cmsClient.fetchSpells(calcParams);
        context.commit('updateSpellList', context.state.spellList.concat(result.data));
        context.commit('updatePagination', result.meta.pagination);
        context.commit('updateAvailableSorting', result.meta.allowedFieldSort);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updateSpellListPending', false);
      }
    },
  },
  mutations: {
    updateSpellListPending(state: SpellState, payload = false) {
      state.spellListPending = payload;
    },
    updateSpellPending(state: SpellState, payload = false) {
      state.spellPending = payload;
    },
    updateSpellList(state: SpellState, payload: Spell[]) {
      state.spellList = payload;
    },
    updateSpell(state: SpellState, payload = undefined) {
      state.spell = payload;
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
    setCurrentFilters(state: SpellState, payload: ISpellFilters) {
      state.filters = JSON.parse(JSON.stringify(payload));
    },
    clearFilter(state: SpellState) {
      state.filters = {};
    },
  },
};

export default spells;
