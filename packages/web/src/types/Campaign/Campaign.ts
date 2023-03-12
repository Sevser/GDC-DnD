export interface CampaignListItem {
  index: string;
  name: string;
  desc: string;
  id: number;
  tabDesc: string;
}

export class CampaignListItemModel implements CampaignListItem {
  index: string;
  name: string;
  desc: string;
  tabDesc: string;
  id: number;
  constructor(prop: CampaignListItem) {
    this.id = prop.id;
    this.index = prop.index;
    this.desc = prop.desc;
    this.tabDesc = prop.tabDesc;
    this.name = prop.name;
  }
  static getEmpty() {
    return new CampaignListItemModel({
      id: NaN,
      name: '',
      desc: '',
      tabDesc: '',
      index: '',
    });
  }
}
