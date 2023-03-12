import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';
import bestiary, { IBeastiaryState } from './bestiary';
import spells, { SpellState } from './spells';
import dictionary, { IDictionaryState } from './dictionary';
import rules, { IRuleState } from './rules';
import race, { IRaceState } from './races';
import classes, { IClassState } from './class';
import equipment, { IEquipmentState } from './equipment';
import campaign, { CampaignState } from './campaign';

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    spells,
    bestiary,
    dictionary,
    rules,
    race,
    classes,
    campaign,
    equipment,
  },
});

export interface State {
  spells: SpellState;
  bestiary: IBeastiaryState;
  dictionary: IDictionaryState;
  rules: IRuleState;
  race: IRaceState;
  classes: IClassState;
  equipment: IEquipmentState;
  campaign: CampaignState;
}

const key: InjectionKey<Store<State>> = Symbol();

export { store, key };
