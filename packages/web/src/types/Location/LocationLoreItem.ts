import { LoreItem } from '../LoreItem/LoreItem';
import { Visibility } from '../Visibility/Visibility';

export class LocationLoreItem implements LoreItem {
  index: string;
  name: string;
  desc: string;
  visibility: Visibility;
  constructor(prop: Partial<LocationLoreItem>) {
    this.index = prop?.index || '';
    this.name = prop?.name || '';
    this.desc = prop?.desc || '';
    this.visibility = new Visibility(prop?.visibility || {});
  }
  static getEmpty() {
    return new LocationLoreItem({
      index: '',
      name: '',
      desc: '',
      visibility: Visibility.getEmpty(),
    });
  }
}
