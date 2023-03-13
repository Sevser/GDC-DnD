export class QuestEventListItem {
  name: string;
  index: string;
  id: number;
  constructor(prop: QuestEventListItem) {
    this.name = prop.name;
    this.id = prop.id;
    this.index = prop.index;
  }
  static getEmpty() {
    return new QuestEventListItem({
      name: '',
      id: NaN,
      index: '',
    });
  }
}
