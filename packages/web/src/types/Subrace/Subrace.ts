import { AbilityBonusModel, IAbilityBonus } from '../AbilityBonus/AbilityBonus';
import { IProficiencyModel, ProficiencyModel } from '../Proficiency/Proficiency';
import { IRaceViewItemModel, RaceViewItemModel } from '../Race/RaceViewItem';
import { ITraitModel, TraitModel } from '../Trait/Trait';

export interface ISubraceModel {
  id: number;
  index: string;
  desc: string;
  name: string;
  race: IRaceViewItemModel;
  abilityBonuses: IAbilityBonus[];
  startProficiencies: IProficiencyModel[];
  racialTraits: ITraitModel[];
}

export class SubraceModel implements ISubraceModel {
  id: number;
  index: string;
  desc: string;
  name: string;
  race: IRaceViewItemModel;
  abilityBonuses: IAbilityBonus[];
  startProficiencies: IProficiencyModel[];
  racialTraits: ITraitModel[];
  constructor(prop: ISubraceModel) {
    this.id = prop.id;
    this.index = prop.index;
    this.desc = prop.desc;
    this.name = prop.name;
    this.race = prop.race;
    this.abilityBonuses = prop.abilityBonuses.map((ability) => new AbilityBonusModel(Object.assign({}, AbilityBonusModel.getEmpty(), ability)));
    this.startProficiencies = prop.startProficiencies.map((prof) => new ProficiencyModel(Object.assign({}, ProficiencyModel.getEmpty(), prof)));
    this.racialTraits = prop.racialTraits.map((trait) => new TraitModel(Object.assign({}, TraitModel.getEmpty(), trait)));
  }

  static getEmpty() {
    return new SubraceModel({
      id: NaN,
      index: '',
      desc: '',
      name: '',
      race: RaceViewItemModel.getEmpty(),
      abilityBonuses: new Array<IAbilityBonus>(),
      startProficiencies: new Array<IProficiencyModel>(),
      racialTraits: new Array<ITraitModel>(),
    });
  }
}
