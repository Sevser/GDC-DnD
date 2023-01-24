import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import spells, { SpellState } from './spells';

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    spells,
  },
});

export interface State {
  spells: SpellState;
}

const key: InjectionKey<Store<State>> = Symbol();

export { store, key };
