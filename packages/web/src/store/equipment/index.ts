import { cmsClient } from '@/plugins/http';
import { ArmorModel, IArmorModel } from '@/types/Armor/Armor';
import { IWeaponModel, WeaponModel } from '@/types/Weapon/Weapon';
import { ActionContext } from 'vuex';
import { State } from '..';

export interface IEquipmentState {
  armorListPending: boolean;
  armorList: IArmorModel[];
  armor: IArmorModel;
  weaponListPending: boolean;
  weaponList: IWeaponModel[];
  weapon: IWeaponModel;
}

const equipment = {
  namespaced: true,
  state: (): IEquipmentState => ({
    armorListPending: false,
    armorList: new Array<IArmorModel>(),
    armor: ArmorModel.getEmpty(),
    weaponListPending: false,
    weaponList: new Array<IWeaponModel>(),
    weapon: WeaponModel.getEmpty(),
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
    async fetchWeaponList(context: ActionContext<IEquipmentState, State>) {
      context.commit('updateWeaponListPending', true);
      context.commit('updateWeaponList', new Array<IWeaponModel>());

      try {
        const result = await cmsClient.fetchWeapon();
        context.commit('updateWeaponList', result);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch (e) {
        console.error(e);
      } finally {
        context.commit('updateWeaponListPending', false);
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
    updateWeaponListPending(state: IEquipmentState, payload = false) {
      state.weaponListPending = payload;
    },
    updateWeaponList(state: IEquipmentState, payload: IWeaponModel[]) {
      state.weaponList = payload;
    },
    updateWeapon(state: IEquipmentState, payload: IWeaponModel = WeaponModel.getEmpty()) {
      state.weapon = payload;
    },
  },
};

export default equipment;
