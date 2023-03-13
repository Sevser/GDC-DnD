export class QuestEpisodeListItem {
  name: string;
  index: string;
  id: number;
  constructor(prop: QuestEpisodeListItem) {
    this.name = prop.name;
    this.id = prop.id;
    this.index = prop.index;
  }
  static getEmpty() {
    return new QuestEpisodeListItem({
      name: '',
      id: NaN,
      index: '',
    });
  }
}
