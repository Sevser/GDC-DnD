import { cmsClient } from '@/plugins/http';
import { ArmorModel, IArmorModel } from '@/types/Armor/Armor';
import { ActionContext } from 'vuex';
import { State } from '..';

export interface IEquipmentState {
  armorListPending: boolean;
  armorList: IArmorModel[];
  armor: IArmorModel;
}

const equipment = {
  namespaced: true,
  state: (): IEquipmentState => ({
    armorListPending: false,
    armorList: new Array<IArmorModel>(),
    armor: ArmorModel.getEmpty(),
  }),
  actions: {
    async fetchArmorList(context: ActionContext<IEquipmentState, State>) {
      context.commit('updateArmorListPending', true);
      context.commit('updateArmorList', new Array<IArmorModel>());

      try {
        const result = await cmsClient.fetchArmor();
        context.commit('updateArmorList', result);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch (e) {
        console.error(e);
      } finally {
        context.commit('updateArmorListPending', false);
      }
    },
  },
  mutations: {
    updateArmorListPending(state: IEquipmentState, payload = false) {
      state.armorListPending = payload;
    },
    updateArmorList(state: IEquipmentState, payload: IArmorModel[]) {
      state.armorList = payload;
    },
    updateArmor(state: IEquipmentState, payload: IArmorModel = ArmorModel.getEmpty()) {
      state.armor = payload;
    },
  },
};

export default equipment;
