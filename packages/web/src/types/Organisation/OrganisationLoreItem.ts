import { LoreItem } from '../LoreItem/LoreItem';
import { Visibility } from '../Visibility/Visibility';

export class OrganisationLoreItem implements LoreItem {
  index: string;
  name: string;
  desc: string;
  visibility: Visibility;
  constructor(prop: Partial<OrganisationLoreItem>) {
    this.index = prop?.index || '';
    this.name = prop?.name || '';
    this.desc = prop?.desc || '';
    this.visibility = new Visibility(prop?.visibility || {});
  }
  static getEmpty() {
    return new OrganisationLoreItem({
      index: '',
      name: '',
      desc: '',
      visibility: Visibility.getEmpty(),
    });
  }
}
