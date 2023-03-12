export interface QuestListItem {
  index: string;
  name: string;
  desc: string;
  id: number;
  tabDesc: string;
}

export class QuestListItemModel implements QuestListItem {
  index: string;
  name: string;
  desc: string;
  tabDesc: string;
  id: number;
  constructor(prop: QuestListItem) {
    this.id = prop.id;
    this.index = prop.index;
    this.desc = prop.desc;
    this.tabDesc = prop.tabDesc;
    this.name = prop.name;
  }
  static getEmpty() {
    return new QuestListItemModel({
      id: NaN,
      name: '',
      desc: '',
      tabDesc: '',
      index: '',
    });
  }
}
