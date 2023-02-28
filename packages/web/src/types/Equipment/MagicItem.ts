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
