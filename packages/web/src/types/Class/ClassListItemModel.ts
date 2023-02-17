export interface IClassListItemModel {
  id: number;
  name: string;
  index: string;
  hitDie: number;
}

export class ClassListItemModel implements IClassListItemModel {
  id: number;
  name: string;
  index: string;
  hitDie: number;
  constructor(prop: IClassListItemModel) {
    this.id = prop.id;
    this.name = prop.name;
    this.index = prop.index;
    this.hitDie = prop.hitDie;
  }

  static getEmpty() {
    return new ClassListItemModel({
      id: NaN,
      name: '',
      index: '',
      hitDie: NaN,
    });
  }
}
