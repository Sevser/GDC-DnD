import { EquipmentCategoryListModel, IEquipmentCategoryListModel } from './EquipmentCategory';

export type MagicItemRarity = 'Common' | 'Uncommon' | 'Varies' | 'Rare' | 'Very Rare' | 'Legendary';

export interface IMagicItemListItem {
  id: number;
  name: string;
  index: string;
  equipmentCategory: IEquipmentCategoryListModel;
  rarity: MagicItemRarity;
}

export class MagicItemListItem implements IMagicItemListItem {
  id: number;
  name: string;
  index: string;
  rarity: MagicItemRarity;
  equipmentCategory: IEquipmentCategoryListModel;
  constructor(prop: IMagicItemListItem) {
    this.id = prop.id;
    this.name = prop.name;
    this.index = prop.index;
    this.rarity = prop.rarity;
    this.equipmentCategory = new EquipmentCategoryListModel(prop.equipmentCategory);
  }
  static getEmpty() {
    return new MagicItemListItem({
      id: NaN,
      name: '',
      index: '',
      rarity: 'Common',
      equipmentCategory: EquipmentCategoryListModel.getEmpty(),
    });
  }
}

export interface IMagicItemModel {
  id: number;
  name: string;
  index: string;
  equipmentCategory: IEquipmentCategoryListModel;
  rarity: MagicItemRarity;
  desc: string;
  variants: IMagicItemListItem[];
}

export class MagicItemModel implements IMagicItemModel {
  id: number;
  name: string;
  index: string;
  desc: string;
  rarity: MagicItemRarity;
  variants: IMagicItemListItem[];
  equipmentCategory: IEquipmentCategoryListModel;
  constructor(prop: IMagicItemModel) {
    this.id = prop.id;
    this.name = prop.name;
    this.index = prop.index;
    this.desc = prop.desc;
    this.rarity = prop.rarity;
    this.equipmentCategory = new EquipmentCategoryListModel(prop.equipmentCategory);
    this.variants = prop.variants.map((mi) => new MagicItemListItem(mi));
  }
  static getEmpty() {
    return new MagicItemModel({
      id: NaN,
      name: '',
      index: '',
      desc: '',
      rarity: 'Common',
      equipmentCategory: EquipmentCategoryListModel.getEmpty(),
      variants: new Array<IMagicItemListItem>(),
    });
  }
}
