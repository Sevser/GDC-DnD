import { cmsClient } from '@/plugins/http';
import { IBeastModel } from '@/types/beasts/Beast';
import { BeastFilter, IBeastFilter } from '@/types/beasts/BeastFilters';
import { BeastListItem, IBeastListItem } from '@/types/beasts/BeastListItem';
import { IGenericQueryParams } from '@/types/GenericStrapiData';
import { IPagination, Pagination } from '@/types/Pagination';
import { Sorting } from '@/types/Sorting';
import { ActionContext } from 'vuex';
import { State } from '..';

export interface IBeastiaryState {
  bestiaryListPending: boolean;
  bestiaryList: IBeastListItem[];
  pagination: Partial<IPagination>;
  sort: {
    current?: Sorting;
    available: Sorting[];
  };
  filters: IBeastFilter;
  beast?: IBeastModel;
  beastPending: boolean;
}

const bestiary = {
  namespaced: true,
  state: (): IBeastiaryState => ({
    bestiaryListPending: false,
    bestiaryList: new Array<IBeastListItem>(),
    pagination: Pagination.default(),
    sort: {
      current: undefined,
      available: new Array<Sorting>(),
    },
    filters: {} as IBeastFilter,
    beast: undefined,
    beastPending: false,
  }),
  actions: {
    async fetchBeast(context: ActionContext<IBeastiaryState, State>, beastId: number | string) {
      context.commit('updateBeastPending', true);
      context.commit('updateBeast');
      try {
        const beast = await cmsClient.fetchBeast(beastId);
        context.commit('updateBeast', beast);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch (e) {
        console.log(e);
      } finally {
        context.commit('updateBeastPending', false);
      }
    },
    async fetchBeastList(context: ActionContext<IBeastiaryState, State>, params: IGenericQueryParams<IBeastListItem>) {
      context.commit('updateBeastListPending', true);
      context.commit('updateBeastList', new Array<BeastListItem>());
      if (!params.sort) {
        context.commit('setCurrentSorting');
      }

      if (!params.filters) {
        params.filters = new BeastFilter(context.state.filters).forParams;
      } else {
        context.commit('setCurrentFilters', params.filters);
      }

      try {
        const result = await cmsClient.fetchBestiary(params);
        context.commit('updateBeastList', result.data);
        context.commit('updatePagination', result.meta.pagination);
        context.commit('updateAvailableSorting', result.meta.allowedFieldSort);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updateBeastListPending', false);
      }
    },
    async fetchMoreBeastList(context: ActionContext<IBeastiaryState, State>, params: IGenericQueryParams<IBeastListItem>) {
      context.commit('updateBeastListPending', true);
      try {
        const calcParams = Object.assign({}, params, context.state.sort.current?.forParams, new BeastFilter(context.state.filters).forParams);
        const result = await cmsClient.fetchBestiary(calcParams);
        context.commit('updateBeastList', context.state.bestiaryList.concat(result.data));
        context.commit('updatePagination', result.meta.pagination);
        context.commit('updateAvailableSorting', result.meta.allowedFieldSort);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updateBeastListPending', false);
      }
    },
  },
  mutations: {
    updateBeastListPending(state: IBeastiaryState, payload = false) {
      state.bestiaryListPending = payload;
    },
    updateBeastPending(state: IBeastiaryState, payload = false) {
      state.beastPending = payload;
    },
    updateBeast(state: IBeastiaryState, payload: IBeastModel) {
      state.beast = payload;
    },
    updateBeastList(state: IBeastiaryState, payload: IBeastListItem[]) {
      state.bestiaryList = payload;
    },
    updateAvailableSorting(state: IBeastiaryState, payload: string[]) {
      state.sort.available = payload.reduce((acc, fieldName) => {
        acc.push(new Sorting({ fieldName, direction: 'asc' }));
        acc.push(new Sorting({ fieldName, direction: 'desc' }));
        return acc;
      }, new Array<Sorting>());
    },
    updatePagination(state: IBeastiaryState, payload: IPagination) {
      state.pagination = new Pagination(payload);
    },
    setCurrentSorting(state: IBeastiaryState, payload: string) {
      state.sort.current = state.sort.available.find((sort: Sorting) => sort.forParams.sort === payload);
    },
    setCurrentFilters(state: IBeastiaryState, payload: IBeastFilter) {
      state.filters = JSON.parse(JSON.stringify(payload));
    },
  },
};

export default bestiary;
