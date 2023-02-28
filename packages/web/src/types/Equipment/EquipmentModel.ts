import { CostModel, ICostModel } from '../Common/Cost';
import { EquipmentCategoryListModel, IEquipmentCategoryListModel } from './EquipmentCategory';

export interface IEquipmentModel {
  id: number;
  name: string;
  index: string;
  equipmentCategory: IEquipmentCategoryListModel;
  cost: ICostModel;
  desc: string;
  weight: number;
}

export default class EquipmentModel implements IEquipmentModel {
  id: number;
  name: string;
  index: string;
  equipmentCategory: IEquipmentCategoryListModel;
  cost: ICostModel;
  desc: string;
  weight: number;
  constructor(prop: IEquipmentModel) {
    this.id = prop.id;
    this.name = prop.name;
    this.index = prop.index;
    this.desc = prop.desc;
    this.weight = prop.weight;
    this.equipmentCategory = new EquipmentCategoryListModel(Object.assign({}, EquipmentCategoryListModel.getEmpty(), prop.equipmentCategory));
    this.cost = new CostModel(prop.cost);
  }
  static getEmpty() {
    return new EquipmentModel({
      id: NaN,
      name: '',
      index: '',
      equipmentCategory: EquipmentCategoryListModel.getEmpty(),
      cost: CostModel.getEmpty(),
      desc: '',
      weight: NaN,
    });
  }
}
