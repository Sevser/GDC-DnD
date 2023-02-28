import { EquipmentCategoryListModel, IEquipmentCategoryListModel } from './EquipmentCategory';

export interface IEquipmentListModel {
  id: number;
  name: string;
  index: string;
  equipmentCategory: IEquipmentCategoryListModel;
}

export class EquipmentListModel implements IEquipmentListModel {
  id: number;
  name: string;
  index: string;
  equipmentCategory: IEquipmentCategoryListModel;
  constructor(prop: IEquipmentListModel) {
    this.id = prop.id;
    this.name = prop.name;
    this.index = prop.index;
    this.equipmentCategory = new EquipmentCategoryListModel(prop.equipmentCategory);
  }
  static getEmpty() {
    return new EquipmentListModel({
      id: NaN,
      name: '',
      index: '',
      equipmentCategory: EquipmentCategoryListModel.getEmpty(),
    });
  }
}
