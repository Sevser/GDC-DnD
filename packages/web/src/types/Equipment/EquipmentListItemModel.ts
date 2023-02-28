import { EquipmentCategoryListModel, IEquipmentCategoryListModel } from './EquipmentCategory';

export interface IEquipmentListItemModel {
  id: number;
  name: string;
  index: string;
  equipmentCategory: IEquipmentCategoryListModel;
}

export class EquipmentListItemModel implements IEquipmentListItemModel {
  id: number;
  name: string;
  index: string;
  equipmentCategory: IEquipmentCategoryListModel;
  constructor(prop: IEquipmentListItemModel) {
    this.id = prop.id;
    this.name = prop.name;
    this.index = prop.index;
    this.equipmentCategory = new EquipmentCategoryListModel(prop.equipmentCategory);
  }
  static getEmpty() {
    return new EquipmentListItemModel({
      id: NaN,
      name: '',
      index: '',
      equipmentCategory: EquipmentCategoryListModel.getEmpty(),
    });
  }
}
