import { cmsClient } from '@/plugins/http';
import { IClassListItemModel } from '@/types/Class/ClassListItemModel';
import { ClassViewModel, IClassViewModel } from '@/types/Class/ClassViewModel';
import { ActionContext } from 'vuex';
import { State } from '..';

export interface IClassState {
  classListPending: boolean;
  classList: IClassListItemModel[];
  class?: IClassViewModel;
  classPending: boolean;
}

const classes = {
  namespaced: true,
  state: (): IClassState => ({
    classListPending: false,
    classList: new Array<IClassListItemModel>(),
    class: undefined,
    classPending: false,
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
    updateClassPending(state: IClassState, payload = false) {
      state.classPending = payload;
    },
    updateClass(state: IClassState, payload: IClassViewModel = ClassViewModel.getEmpty()) {
      state.class = payload;
    },
  },
};

export default classes;
