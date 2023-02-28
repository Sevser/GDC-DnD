export interface IEquipmentCategoryListModel {
  id: number;
  name: string;
  index: string;
}

export class EquipmentCategoryListModel implements IEquipmentCategoryListModel {
  id: number;
  name: string;
  index: string;
  constructor(prop: IEquipmentCategoryListModel) {
    this.name = prop.name;
    this.index = prop.index;
    this.id = prop.id;
  }
  static getEmpty() {
    return new EquipmentCategoryListModel({
      id: NaN,
      name: '',
      index: '',
    });
  }
}
