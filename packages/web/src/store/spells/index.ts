import { cmsClient } from '@/plugins/http';
import { IPagination } from '@/types/GenericStrapiData';
import { Spell } from '@/types/Spell';
import { ActionContext } from 'vuex';
import { State } from '..';

export interface SpellState {
  spellListPending: boolean;
  spellList: Spell[];
  pagination: IPagination;
}

const spells = {
  namespaced: true,
  state: () => ({
    spellListPending: false,
    spellList: [],
    pagination: {} as IPagination,
  }),
  actions: {
    async fetchSpellList(context: ActionContext<SpellState, State>) {
      context.commit('updatePending', true);
      context.commit('updateSpellList', new Array<Spell>());
      try {
        const result = await cmsClient.fetchSpells();
        context.commit('updateSpellList', result.data);
        context.commit('updatePagination', result.meta.pagination);
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
      state.pagination = payload;
    },
  },
};

export default spells;
