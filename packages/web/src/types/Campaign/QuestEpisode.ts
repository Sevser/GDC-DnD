export interface QuestEpisode {
  name: string;
  index: string;
  id: number;
}

export class QuestEpisodeModel implements QuestEpisode {
  name: string;
  index: string;
  id: number;
  constructor(prop: QuestEpisode) {
    this.name = prop.name;
    this.id = prop.id;
    this.index = prop.index;
  }
  static getEmpty() {
    return new QuestEpisodeModel({
      name: '',
      id: NaN,
      index: '',
    });
  }
}
