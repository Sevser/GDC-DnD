import { EquipmentListItemModel } from '../Equipment/EquipmentListItemModel';
import { Visibility } from '../Visibility/Visibility';
import { BeastListItem } from '../beasts/BeastListItem';
import { OrganisationLoreItem } from './OrganisationLoreItem';
import { MagicItemListItem } from '../Equipment/MagicItem';

export class OrganisationModel {
  index: string;
  name: string;
  tabDesc: string;
  shortDescription: OrganisationLoreItem;
  locationLoreItems: OrganisationLoreItem[];
  visibility: Visibility;
  equipment: EquipmentListItemModel[];
  beasts: BeastListItem[];
  magicItems: MagicItemListItem[];
  constructor(prop: Partial<OrganisationModel>) {
    this.index = prop?.index || '';
    this.name = prop?.name || '';
    this.tabDesc = prop?.tabDesc || '';
    this.shortDescription = new OrganisationLoreItem(prop?.shortDescription || {});
    this.locationLoreItems = prop?.locationLoreItems || [];
    this.visibility = new Visibility(prop?.visibility || {});
    this.equipment = prop?.equipment || [];
    this.beasts = prop?.beasts || [];
    this.magicItems = prop?.magicItems || [];
  }
  static getEmpty() {
    return new OrganisationModel({
      index: '',
      name: '',
      tabDesc: '',
      shortDescription: OrganisationLoreItem.getEmpty(),
      visibility: Visibility.getEmpty(),
    });
  }
}
