import { IProficiencyModel, ProficiencyModel } from './Proficiency';

export interface IProficiencyChoiseModel {
  id: number;
  desc: string;
  choose: number;
  proficiencies: IProficiencyModel[];
}

export class ProficiencyChoiseModel implements IProficiencyChoiseModel {
  id: number;
  desc: string;
  choose: number;
  proficiencies: IProficiencyModel[];
  constructor(prop: IProficiencyChoiseModel) {
    this.id = prop.id;
    this.desc = prop.desc;
    this.choose = prop.choose;
    this.proficiencies = prop.proficiencies.map((p) => new ProficiencyModel(Object.assign({}, ProficiencyModel.getEmpty(), p)));
  }
  static getEmpty() {
    return new ProficiencyChoiseModel({
      id: NaN,
      desc: '',
      proficiencies: new Array<IProficiencyModel>(),
      choose: NaN,
    });
  }
}
