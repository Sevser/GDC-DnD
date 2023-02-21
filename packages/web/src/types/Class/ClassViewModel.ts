import { IAbilityScore, AbilityScoreModel } from '../AbilityScore/AbilityScore';
import { IProficiency, ProficiencyModel } from '../Proficiency/Proficiency';

export interface IClassViewModel {
  id: number;
  index: string;
  name: string;
  hitDie: number;
  proficiencies: IProficiency[];
  savingThrows: IAbilityScore[];
}

export class ClassViewModel implements IClassViewModel {
  id: number;
  index: string;
  name: string;
  hitDie: number;
  proficiencies: IProficiency[];
  savingThrows: IAbilityScore[];
  constructor(prop: IClassViewModel) {
    this.id = prop.id;
    this.index = prop.index;
    this.name = prop.name;
    this.hitDie = prop.hitDie;
    this.proficiencies = prop.proficiencies.map((p) => new ProficiencyModel(Object.assign({}, ProficiencyModel.getEmpty(), p)));
    this.savingThrows = prop.savingThrows.map((st) => new AbilityScoreModel(Object.assign({}, AbilityScoreModel.getEmpty(), st)));
  }
  static getEmpty() {
    return new ClassViewModel({
      id: NaN,
      index: '',
      name: '',
      hitDie: NaN,
      proficiencies: new Array<IProficiency>(),
      savingThrows: new Array<IAbilityScore>(),
    });
  }
}
