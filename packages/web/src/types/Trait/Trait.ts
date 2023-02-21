import { IProficiency, ProficiencyModel } from '../Proficiency/Proficiency';

export interface ITraitModel {
  id: number;
  index: string;
  name: string;
  desc: string;
  proficiencies: IProficiency[];
}

export class TraitModel implements ITraitModel {
  id: number;
  index: string;
  name: string;
  desc: string;
  proficiencies: IProficiency[];
  constructor(prop: ITraitModel) {
    this.id = prop.id;
    this.index = prop.index;
    this.name = prop.name;
    this.desc = prop.desc;
    this.proficiencies = prop.proficiencies.map((p) => new ProficiencyModel(Object.assign({}, ProficiencyModel.getEmpty(), p)));
  }
  static getEmpty() {
    return new TraitModel({
      id: NaN,
      index: '',
      name: '',
      desc: '',
      proficiencies: new Array<ProficiencyModel>(),
    });
  }
}
