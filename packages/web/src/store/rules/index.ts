import { cmsClient } from '@/plugins/http';
import { IRuleListItem, RuleListItem, RuleViewItemModel } from '@/types/Rule/Rule';
import { ActionContext } from 'vuex';
import { State } from '..';

export interface IRuleState {
  ruleList: IRuleListItem[];
  ruleListPending: boolean;
  currentRule: IRuleListItem;
  currentRuleView?: RuleViewItemModel;
  currentRuleViewPending: boolean;
}

const rules = {
  namespaced: true,
  state: (): IRuleState => ({
    ruleList: new Array<IRuleListItem>(),
    ruleListPending: false,
    currentRule: RuleListItem.getEmpty(),
    currentRuleView: undefined,
    currentRuleViewPending: false,
  }),
  actions: {
    async fetchRule(context: ActionContext<IRuleState, State>, ruleId: number | string) {
      context.commit('updateRuleViewPending', true);
      context.commit('updateRuleView');
      try {
        const rule = await cmsClient.fetchRuleItem(ruleId);
        context.commit('updateRuleView', rule);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch (e) {
      } finally {
        context.commit('updateRuleViewPending', false);
      }
    },
    async fetchRuleList(context: ActionContext<IRuleState, State>) {
      context.commit('updateRuleListPending', true);
      context.commit('updateRuleList', new Array<IRuleListItem>());
      try {
        const result = await cmsClient.fetchRules();
        context.commit('updateRuleList', result.data);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updateRuleListPending', false);
      }
    },
  },
  mutations: {
    updateRuleListPending(state: IRuleState, payload = false) {
      state.ruleListPending = payload;
    },
    updateRuleList(state: IRuleState, payload = new Array<IRuleListItem>()) {
      state.ruleList = payload;
    },
    updateRuleViewPending(state: IRuleState, payload = false) {
      state.currentRuleViewPending = payload;
    },
    updateRuleView(state: IRuleState, payload = RuleViewItemModel.getEmpty()) {
      state.currentRuleView = payload;
    },
    updateCurrentRule(state: IRuleState, payload: IRuleListItem) {
      state.currentRule = payload;
    },
  },
};

export default rules;
