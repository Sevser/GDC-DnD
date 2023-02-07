import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import bestiary, { IBeastiaryState } from './bestiary';
import spells, { SpellState } from './spells';

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    spells,
    bestiary,
  },
});

export interface State {
  spells: SpellState;
  bestiary: IBeastiaryState;
}

const key: InjectionKey<Store<State>> = Symbol();

export { store, key };
