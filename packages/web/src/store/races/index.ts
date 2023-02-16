import { cmsClient } from '@/plugins/http';
import { IRaceListItemModel } from '@/types/Race/RaceListItem';
import { IRaceViewItemModel, RaceViewItemModel } from '@/types/Race/RaceViewItem';
import { ActionContext } from 'vuex';
import { State } from '..';

export interface IRaceState {
  raceListPending: boolean;
  raceList: IRaceListItemModel[];
  race?: IRaceViewItemModel;
  racePending: boolean;
}

const race = {
  namespaced: true,
  state: (): IRaceState => ({
    raceListPending: false,
    raceList: new Array<IRaceListItemModel>(),
    race: undefined,
    racePending: false,
  }),
  actions: {
    async fetchRaceList(context: ActionContext<IRaceState, State>) {
      context.commit('updateRaceListPending', true);
      context.commit('updateRaceList', new Array<IRaceListItemModel>());

      try {
        const result = await cmsClient.fetchRaces();
        context.commit('updateRaceList', result.data);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updateRaceListPending', false);
      }
    },
    async fetchRace(context: ActionContext<IRaceState, State>, raceId: number | string) {
      context.commit('updateRacePending', true);
      context.commit('updateRace');
      try {
        const race = await cmsClient.fetchRace(raceId);
        context.commit('updateRace', race);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch (e) {
        console.log(e);
      } finally {
        context.commit('updateRacePending', false);
      }
    },
  },
  mutations: {
    updateRaceListPending(state: IRaceState, payload = false) {
      state.raceListPending = payload;
    },
    updateRaceList(state: IRaceState, payload: IRaceListItemModel[]) {
      state.raceList = payload;
    },
    updateRacePending(state: IRaceState, payload = false) {
      state.racePending = payload;
    },
    updateRace(state: IRaceState, payload = RaceViewItemModel.getEmpty()) {
      state.race = payload;
    },
  },
};

export default race;
