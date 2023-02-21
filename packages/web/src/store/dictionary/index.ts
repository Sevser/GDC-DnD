import { cmsClient } from '@/plugins/http';
import { CanBeDictionaryProvider, ICanBeDictionary } from '@/types/Dictionaries/CanBeDictionary';
import { IDictionary } from '@/types/Dictionaries/Dictionary';
import { ActionContext } from 'vuex';
import { State } from '..';

export interface IDictionaryState {
  dictionariesList: IDictionary[];
  dictionariesListPending: boolean;
  currentDictionary?: IDictionary;
  dictionaryContent?: ICanBeDictionary[];
  dictionaryContentPending: boolean;
}

const dictionary = {
  namespaced: true,
  state: (): IDictionaryState => ({
    dictionariesList: new Array<IDictionary>(),
    dictionariesListPending: false,
    currentDictionary: undefined,
    dictionaryContent: undefined,
    dictionaryContentPending: false,
  }),
  actions: {
    async fetchDicrionary(context: ActionContext<IDictionaryState, State>, dictionaryType: string) {
      context.commit('updateDictionaryContentPending', true);
      context.commit('updateDictionaryContent');
      try {
        const provider = new CanBeDictionaryProvider().getCmsProviderByType((context.state.currentDictionary?.collectionName as string) || dictionaryType);
        const collection = await provider();
        context.commit('updateDictionaryContent', collection.data);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch (e) {
        console.error(e);
      } finally {
        context.commit('updateDictionaryContentPending', false);
      }
    },
    async fetchDictionaries(context: ActionContext<IDictionaryState, State>) {
      context.commit('updateDictionariesListPending', true);
      context.commit('updateDictionariesList', new Array<IDictionary>());

      try {
        const result = await cmsClient.fetchDictionaries();
        context.commit('updateDictionariesList', result.data);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updateDictionariesListPending', false);
      }
    },
  },
  mutations: {
    updateDictionariesList(state: IDictionaryState, payload = new Array<IDictionary>()) {
      state.dictionariesList = payload;
    },
    updateDictionariesListPending(state: IDictionaryState, payload = false) {
      state.dictionariesListPending = payload;
    },
    updateCurrentDicrionary(state: IDictionaryState, payload = undefined) {
      state.currentDictionary = payload;
    },
    updateDictionaryContent(state: IDictionaryState, payload: dictionaryContentType = undefined) {
      state.dictionaryContent = payload;
    },
    updateDictionaryContentPending(state: IDictionaryState, payload = false) {
      state.dictionaryContentPending = payload;
    },
  },
};

export default dictionary;
