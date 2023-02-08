import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import bestiary, { IBeastiaryState } from './bestiary';
import spells, { SpellState } from './spells';
import dictionary, { IDictionaryState } from './dictionary';

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    spells,
    bestiary,
    dictionary,
  },
});

export interface State {
  spells: SpellState;
  bestiary: IBeastiaryState;
  dictionary: IDictionaryState;
}

const key: InjectionKey<Store<State>> = Symbol();

export { store, key };
