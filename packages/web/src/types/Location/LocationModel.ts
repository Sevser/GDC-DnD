import { EquipmentListItemModel } from '../Equipment/EquipmentListItemModel';
import { Visibility } from '../Visibility/Visibility';
import { BeastListItem } from '../beasts/BeastListItem';
import { LocationLoreItem } from './LocationLoreItem';
import { MagicItemListItem } from '';

export class LocationModel {
  index: string;
  name: string;
  tabDesc: string;
  shortDescription: LocationLoreItem;
  locationLoreItems: LocationLoreItem[];
  visibility: Visibility;
  equipment: EquipmentListItemModel[];
  beasts: BeastListItem[];
  magicItems: MagicItemListItem[];
  constructor(prop: Partial<LocationModel>) {
    this.index = prop?.index || '';
    this.name = prop?.name || '';
    this.tabDesc = prop?.tabDesc || '';
    this.shortDescription = new LocationLoreItem(prop?.shortDescription || {});
    this.locationLoreItems = prop?.locationLoreItems || [];
    this.visibility = new Visibility(prop?.visibility || {});
    this.equipment = prop?.equipment || [];
    this.beasts = prop?.beasts || [];
    this.magicItems = prop?.magicItems || [];
  }
  static getEmpty() {
    return new LocationModel({
      index: '',
      name: '',
      tabDesc: '',
      shortDescription: LocationLoreItem.getEmpty(),
      visibility: Visibility.getEmpty(),
    });
  }
}
