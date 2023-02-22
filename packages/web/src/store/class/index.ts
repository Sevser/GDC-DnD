import { cmsClient } from '@/plugins/http';
import { IClassListItemModel } from '@/types/Class/ClassListItemModel';
import { ClassViewModel, IClassViewModel } from '@/types/Class/ClassViewModel';
import { ILevelModel } from '@/types/Level/Level';
import { ISubclassModel } from '@/types/Subclass/Subclass';
import { ActionContext } from 'vuex';
import { State } from '..';

export interface IClassState {
  classListPending: boolean;
  classList: IClassListItemModel[];
  class?: IClassViewModel;
  classPending: boolean;
  classLevels: ILevelModel[];
  classLevelsPending: boolean;
  classArchetypes: ISubclassModel[];
  classArchetypesPending: boolean;
}

const classes = {
  namespaced: true,
  state: (): IClassState => ({
    classListPending: false,
    classList: new Array<IClassListItemModel>(),
    class: undefined,
    classPending: false,
    classLevels: new Array<ILevelModel>(),
    classLevelsPending: false,
    classArchetypes: new Array<ISubclassModel>(),
    classArchetypesPending: false,
  }),
  actions: {
    async fetchClassList(context: ActionContext<IClassState, State>) {
      context.commit('updateClassListPending', true);
      context.commit('updateClassList', new Array<IClassListItemModel>());

      try {
        const result = await cmsClient.fetchClasses();
        context.commit('updateClassList', result.data);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updateClassListPending', false);
      }
    },
    async fetchClassLevels(context: ActionContext<IClassState, State>, classId: number) {
      context.commit('updateClassLevelsPending', true);
      context.commit('updateClassLevels', new Array<IClassListItemModel>());

      try {
        const result = await cmsClient.fetchLevels(classId);
        context.commit('updateClassLevels', result.data);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updateClassLevelsPending', false);
      }
    },
    async fetchClassArchetypes(context: ActionContext<IClassState, State>, classId: number) {
      context.commit('updateClassArhetypesPending', true);
      context.commit('updateClassArhetypes', new Array<IClassListItemModel>());

      try {
        const result = await cmsClient.fetchArchetypes(classId);
        context.commit('updateClassArhetypes', result.data);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updateClassArhetypesPending', false);
      }
    },
    async fetchClass(context: ActionContext<IClassState, State>, classId: number | string) {
      context.commit('updateClassPending', true);
      context.commit('updateClass');
      try {
        const classes = await cmsClient.fetchClass(classId);
        context.commit('updateClass', classes);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch (e) {
        console.log(e);
      } finally {
        context.commit('updateClassPending', false);
      }
    },
  },
  mutations: {
    updateClassListPending(state: IClassState, payload = false) {
      state.classListPending = payload;
    },
    updateClassList(state: IClassState, payload: IClassListItemModel[]) {
      state.classList = payload;
    },
    updateClassLevelsPending(state: IClassState, payload = false) {
      state.classLevelsPending = payload;
    },
    updateClassLevels(state: IClassState, payload: ILevelModel[]) {
      state.classLevels = payload;
    },
    updateClassPending(state: IClassState, payload = false) {
      state.classPending = payload;
    },
    updateClass(state: IClassState, payload: IClassViewModel = ClassViewModel.getEmpty()) {
      state.class = payload;
    },
    updateClassArhetypesPending(state: IClassState, payload = false) {
      state.classArchetypesPending = payload;
    },
    updateClassArhetypes(state: IClassState, payload = new Array<ISubclassModel>()) {
      state.classArchetypes = payload;
    },
  },
};

export default classes;
