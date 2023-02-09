export interface IRuleSection {
  id: number;
  index: string;
  desc: string;
  name: string;
}

export class RuleSectionModel implements IRuleSection {
  id: number;
  index: string;
  desc: string;
  name: string;
  constructor(prop: IRuleSection) {
    this.id = prop.id;
    this.index = prop.index;
    this.desc = prop.desc;
    this.name = prop.name;
  }
  static getEmpty() {
    return new RuleSectionModel({
      id: NaN,
      index: '',
      desc: '',
      name: '',
    });
  }
}
