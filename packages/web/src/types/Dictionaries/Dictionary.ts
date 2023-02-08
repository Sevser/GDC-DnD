export interface IDictionary {
  id: number;
  title: string;
  subtitie: string;
  collectionName: string;
}

export class DictionaryModel implements IDictionary {
  id: number;
  title: string;
  subtitie: string;
  collectionName: string;
  constructor(prop: IDictionary) {
    this.collectionName = prop.collectionName;
    this.id = prop.id;
    this.title = prop.title;
    this.subtitie = prop.subtitie;
  }

  static getEmpty() {
    return new DictionaryModel({
      id: NaN,
      title: '',
      subtitie: '',
      collectionName: '',
    });
  }
}
