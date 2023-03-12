import { cmsClient } from '@/plugins/http';
import { CampaignListItem } from '@/types/Campaign/Campaign';
import { ActionContext } from 'vuex';
import { State } from '..';

export interface CampaignState {
  campaignList: CampaignListItem[];
  campaignListPending: boolean;
  createCampaignPending: boolean;
}

const campaign = {
  namespaced: true,
  state: (): CampaignState => ({
    campaignList: new Array<CampaignListItem>(),
    campaignListPending: false,
    createCampaignPending: false,
  }),
  actions: {
    async createCampaign(context: ActionContext<CampaignState, State>, campaign: CampaignListItem) {
      context.commit('updateCampaignListPending', true);
      try {
        const result = await cmsClient.createCampaign(campaign);
        console.log(result);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updateCampaignListPending', false);
      }
    },
    async fetchCampaignList(context: ActionContext<CampaignState, State>) {
      context.commit('updateCampaignListPending', true);
      context.commit('updateCampaignList', new Array<CampaignListItem>());
      try {
        const result = await cmsClient.fetchCampaigns();
        context.commit('updateCampaignList', result.data);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updateCampaignListPending', false);
      }
    },
  },
  mutations: {
    updateCampaignListPending(state: CampaignState, payload = false) {
      state.campaignListPending = payload;
    },
    updateCreateCampaignPending(state: CampaignState, payload = false) {
      state.createCampaignPending = payload;
    },
    updateCampaignList(state: CampaignState, payload = new Array<CampaignListItem>()) {
      state.campaignList = payload;
    },
  },
};

export default campaign;
