import { cmsClient } from '@/plugins/http';
import { ArmorModel, IArmorModel } from '@/types/Armor/Armor';
import { EquipmentListModel, IEquipmentListModel } from '@/types/Equipment/Equipment';
import { IMagicItemListItem, MagicItemListItem } from '@/types/Equipment/MagicItem';
import { IGenericQueryParams } from '@/types/GenericStrapiData';
import { IPagination, Pagination } from '@/types/Pagination';
import { IWeaponModel, WeaponModel } from '@/types/Weapon/Weapon';
import { ActionContext } from 'vuex';
import { State } from '..';

export interface IEquipmentState {
  equipmentListPending: boolean;
  equipmentList: IEquipmentListModel[];
  pagination: Partial<IPagination>;
  magicItemsListPending: boolean;
  magicItemsList: IMagicItemListItem[];
  magicItemsListPagination: Partial<IPagination>;
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
    equipmentListPending: false,
    equipmentList: new Array<IEquipmentListModel>(),
    pagination: Pagination.default(),
    magicItemsListPending: false,
    magicItemsList: new Array<IMagicItemListItem>(),
    magicItemsListPagination: Pagination.default(),
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
    async fetchEquipmentList(context: ActionContext<IEquipmentState, State>, params: IGenericQueryParams<EquipmentListModel>) {
      context.commit('updateEquipmentListPending', true);
      context.commit('updateEquipmentList', new Array<IEquipmentListModel>());
      try {
        const result = await cmsClient.fetchEquipment(params);
        context.commit('updateEquipmentList', result.data);
        context.commit('updateEquipmentPagination', result.meta.pagination);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch (e) {
        console.log(e);
      } finally {
        context.commit('updateEquipmentListPending', false);
      }
    },
    async fetchMoreEquipmentList(context: ActionContext<IEquipmentState, State>, params: IGenericQueryParams<EquipmentListModel>) {
      context.commit('updateEquipmentListPending', true);
      try {
        const calcParams = Object.assign({}, params);
        const result = await cmsClient.fetchEquipment(calcParams);
        context.commit('updateEquipmentList', context.state.equipmentList.concat(result.data));
        context.commit('updateEquipmentPagination', result.meta.pagination);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updateEquipmentListPending', false);
      }
    },
    async fetchMagicItemList(context: ActionContext<IEquipmentState, State>, params: IGenericQueryParams<MagicItemListItem>) {
      context.commit('updateMagicItemListPending', true);
      context.commit('updateMagicItemList', new Array<IMagicItemListItem>());
      try {
        const result = await cmsClient.fetchMagicItems(params);
        context.commit('updateMagicItemList', result.data);
        context.commit('updateMagicItemPagination', result.meta.pagination);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch (e) {
        console.log(e);
      } finally {
        context.commit('updateMagicItemListPending', false);
      }
    },
    async fetchMoreMagicItemList(context: ActionContext<IEquipmentState, State>, params: IGenericQueryParams<MagicItemListItem>) {
      context.commit('updateMagicItemListPending', true);
      try {
        const calcParams = Object.assign({}, params);
        const result = await cmsClient.fetchMagicItems(calcParams);
        context.commit('updateMagicItemList', context.state.magicItemsList.concat(result.data));
        context.commit('updateMagicItemPagination', result.meta.pagination);
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        context.commit('updateMagicItemListPending', false);
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
    updateEquipmentListPending(state: IEquipmentState, payload = false) {
      state.equipmentListPending = payload;
    },
    updateEquipmentList(state: IEquipmentState, payload: IEquipmentListModel[]) {
      state.equipmentList = payload;
    },
    updateEquipmentPagination(state: IEquipmentState, payload: IPagination) {
      state.pagination = new Pagination(payload);
    },
    updateMagicItemListPending(state: IEquipmentState, payload = false) {
      state.magicItemsListPending = payload;
    },
    updateMagicItemList(state: IEquipmentState, payload: IMagicItemListItem[]) {
      state.magicItemsList = payload;
    },
    updateMagicItemPagination(state: IEquipmentState, payload: IPagination) {
      state.magicItemsListPagination = new Pagination(payload);
    },
    updateWeapon(state: IEquipmentState, payload: IWeaponModel = WeaponModel.getEmpty()) {
      state.weapon = payload;
    },
  },
};

export default equipment;
