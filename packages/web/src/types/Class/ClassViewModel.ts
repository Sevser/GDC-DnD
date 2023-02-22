import { IAbilityScore, AbilityScoreModel } from '../AbilityScore/AbilityScore';
import { IProficiencyModel, ProficiencyModel } from '../Proficiency/Proficiency';
import { IProficiencyChoiseModel, ProficiencyChoiseModel } from '../Proficiency/ProficiencyChoise';

export interface IClassViewModel {
  id: number;
  index: string;
  name: string;
  hitDie: number;
  proficiencies: IProficiencyModel[];
  savingThrows: IAbilityScore[];
  proficiencyChoices: IProficiencyChoiseModel[];
}

export class ClassViewModel implements IClassViewModel {
  id: number;
  index: string;
  name: string;
  hitDie: number;
  proficiencies: IProficiencyModel[];
  savingThrows: IAbilityScore[];
  proficiencyChoices: IProficiencyChoiseModel[];
  constructor(prop: IClassViewModel) {
    this.id = prop.id;
    this.index = prop.index;
    this.name = prop.name;
    this.hitDie = prop.hitDie;
    this.proficiencies = prop.proficiencies.map((p) => new ProficiencyModel(Object.assign({}, ProficiencyModel.getEmpty(), p)));
    this.proficiencyChoices = prop.proficiencyChoices.map((p) => new ProficiencyChoiseModel(Object.assign({}, ProficiencyChoiseModel.getEmpty(), p)));
    this.savingThrows = prop.savingThrows.map((st) => new AbilityScoreModel(Object.assign({}, AbilityScoreModel.getEmpty(), st)));
  }
  static getEmpty() {
    return new ClassViewModel({
      id: NaN,
      index: '',
      name: '',
      hitDie: NaN,
      proficiencies: new Array<IProficiencyModel>(),
      savingThrows: new Array<IAbilityScore>(),
      proficiencyChoices: new Array<IProficiencyChoiseModel>(),
    });
  }
}
