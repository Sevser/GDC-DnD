import { cmsClient } from '@/plugins/http';
import { CampaignListItem } from '@/types/Campaign/Campaign';
import { QuestListItem, QuestListItemModel } from '@/types/Campaign/Quest';
import { QuestEpisodeListItem } from '@/types/Campaign/QuestEpisode';
import { QuestEventListItem } from '@/types/Campaign/QuestEvent';
import { ActionContext } from 'vuex';
import { State } from '..';

export interface CampaignState {
  campaignList: CampaignListItem[];
  campaignListPending: boolean;
  createCampaignPending: boolean;
  questList: QuestListItem[];
  questListPending: boolean;
  canEditCampaign: boolean;
  canEditEpisode: boolean;
  canEditQuest: boolean;
  episodeList: QuestEpisodeListItem[];
  episodeListPending: boolean;
  eventList: QuestEventListItem[];
  eventListPending: boolean;
  createQuestEpisodePending: boolean;
  createQuestEventPending: boolean;
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
    canEditEpisode: false,
    episodeList: [],
    episodeListPending: false,
    createQuestEpisodePending: false,
    createQuestEventPending: false,
    eventList: [],
    eventListPending: false,
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
    async fetchQuestEpisodesList(context: ActionContext<CampaignState, State>, questId: number) {
      context.commit('updateEpisodeListPending', true);
      context.commit('updateEpisodeList', new Array<QuestEpisodeListItem>());
      context.commit('updateCanEditEpisode', false);
      try {
        const result = await cmsClient.fetchQuestEpisodes(questId);
        context.commit('updateEpisodeList', result.data);
        context.commit('updateCanEditEpisode', result.meta.canEdit);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updateEpisodeListPending', false);
      }
    },
    async createQuestEpisode(context: ActionContext<CampaignState, State>, { questEpisode, questId }: { questEpisode: QuestEpisodeListItem; questId: number }) {
      context.commit('updateCreateQuestEpisodePending', true);
      try {
        const result = await cmsClient.createQuestEpisode(questEpisode, questId);
        console.log(result);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updateCreateQuestEpisodePending', false);
      }
    },
    async createQuestEvent(context: ActionContext<CampaignState, State>, { event, episodeId }: { event: QuestEventListItem; episodeId: number }) {
      context.commit('updateCreateQuestEventPending', true);
      try {
        const result = await cmsClient.createQuestEvent(event, episodeId);
        console.log(result);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updateCreateQuestEventPending', false);
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
    async fetchQuestEventsList(context: ActionContext<CampaignState, State>, episodeId: number) {
      context.commit('updateEventListPending', true);
      context.commit('updateEventList', new Array<QuestEpisodeListItem>());
      context.commit('updateCanEditEpisode', false);
      try {
        const result = await cmsClient.fetchQuestEvents(episodeId);
        context.commit('updateEventList', result.data);
        context.commit('updateCanEditEpisode', result.meta.canEdit);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updateEventListPending', false);
      }
    },
  },
  mutations: {
    updateCreateCampaignPending(state: CampaignState, payload = false) {
      state.createCampaignPending = payload;
    },
    updateCreateQuestEpisodePending(state: CampaignState, payload = false) {
      state.createQuestEpisodePending = payload;
    },
    updateCreateQuestEventPending(state: CampaignState, payload = false) {
      state.createQuestEventPending = payload;
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
    updateCanEditEpisode(state: CampaignState, payload = false) {
      state.canEditEpisode = payload;
    },
    updateQuestList(state: CampaignState, payload = new Array<QuestListItem>()) {
      state.questList = payload;
    },
    updateEpisodeListPending(state: CampaignState, payload = false) {
      state.episodeListPending = payload;
    },
    updateEpisodeList(state: CampaignState, payload = new Array<QuestEpisodeListItem>()) {
      state.episodeList = payload;
    },
    updateEventListPending(state: CampaignState, payload = false) {
      state.eventListPending = payload;
    },
    updateEventList(state: CampaignState, payload = new Array<QuestEventListItem>()) {
      state.eventList = payload;
    },
  },
};

export default campaign;
