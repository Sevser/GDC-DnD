import { cmsClient } from '@/plugins/http';
import { CampaignListItem } from '@/types/Campaign/Campaign';
import { QuestListItem, QuestListItemModel } from '@/types/Campaign/Quest';
import { ActionContext } from 'vuex';
import { State } from '..';

export interface CampaignState {
  campaignList: CampaignListItem[];
  campaignListPending: boolean;
  createCampaignPending: boolean;
  questList: QuestListItem[];
  questListPending: boolean;
  canEditCampaign: boolean;
  canEditQuest: boolean;
}

const campaign = {
  namespaced: true,
  state: (): CampaignState => ({
    campaignList: new Array<CampaignListItem>(),
    campaignListPending: false,
    createCampaignPending: false,
    questList: new Array<QuestListItem>(),
    questListPending: false,
    canEditCampaign: false,
    canEditQuest: false,
  }),
  actions: {
    async createCampaign(context: ActionContext<CampaignState, State>, campaign: CampaignListItem) {
      context.commit('updateCampaignListPending', true);
      try {
        const result = await cmsClient.createCampaign(campaign);
        return result;
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
    async fetchQuestList(context: ActionContext<CampaignState, State>, campaignId: number) {
      context.commit('updateQuestListPending', true);
      context.commit('updateQuestListCanEdit', false);
      context.commit('updateQuestList', new Array<CampaignListItem>());
      try {
        const result = await cmsClient.fetchQuests(campaignId);
        context.commit('updateQuestList', result.data);
        context.commit('updateQuestListCanEdit', result.meta.canEdit);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updateQuestListPending', false);
      }
    },
    async createQuest(context: ActionContext<CampaignState, State>, { quest, campaignId }: { quest: QuestListItemModel; campaignId: number }) {
      context.commit('updateCampaignListPending', true);
      try {
        const result = await cmsClient.createQuest(quest, campaignId);
        console.log(result);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updateCampaignListPending', false);
      }
    },
  },
  mutations: {
    updateCreateCampaignPending(state: CampaignState, payload = false) {
      state.createCampaignPending = payload;
    },
    updateCampaignListPending(state: CampaignState, payload = false) {
      state.campaignListPending = payload;
    },
    updateCampaignList(state: CampaignState, payload = new Array<CampaignListItem>()) {
      state.campaignList = payload;
    },
    updateQuestListPending(state: CampaignState, payload = false) {
      state.questListPending = payload;
    },
    updateQuestListCanEdit(state: CampaignState, payload = false) {
      state.canEditCampaign = payload;
    },
    updateQuestList(state: CampaignState, payload = new Array<QuestListItem>()) {
      state.questList = payload;
    },
  },
};

export default campaign;
