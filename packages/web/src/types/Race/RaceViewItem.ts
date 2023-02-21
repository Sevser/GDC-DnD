import { AbilityBonusModel, IAbilityBonus } from '../AbilityBonus/AbilityBonus';
import { BeastSizeModel, IBeastSizeModel } from '../beasts/BeastSize';
import { ILanguageListItemModel, LanguageListItemModel } from '../Language/Language';
import { IProficiency, ProficiencyModel } from '../Proficiency/Proficiency';
import { ISpeedModel, SpeedModel } from '../speed/Speed';
import { ISubraceModel, SubraceModel } from '../Subrace/Subrace';
import { ITraitModel, TraitModel } from '../Trait/Trait';

export interface IRaceViewItemModel {
  id: number;
  index: string;
  name: string;
  alignment: string;
  languageDesc: string;
  size: IBeastSizeModel;
  sizeDescription: string;
  speed: ISpeedModel;
  abilityBonuses: IAbilityBonus[];
  startProficiencies: IProficiency[];
  languages: ILanguageListItemModel[];
  traits: ITraitModel[];
  subraces: ISubraceModel[];
}

export class RaceViewItemModel implements IRaceViewItemModel {
  id: number;
  index: string;
  name: string;
  alignment: string;
  languageDesc: string;
  size: IBeastSizeModel;
  sizeDescription: string;
  speed: ISpeedModel;
  abilityBonuses: IAbilityBonus[];
  startProficiencies: IProficiency[];
  languages: ILanguageListItemModel[];
  traits: ITraitModel[];
  subraces: ISubraceModel[];
  constructor(prop: IRaceViewItemModel) {
    this.index = prop.index;
    this.id = prop.id;
    this.name = prop.name;
    this.alignment = prop.alignment;
    this.languageDesc = prop.languageDesc;
    this.sizeDescription = prop.sizeDescription;
    this.size = new BeastSizeModel(prop.size);
    this.speed = new SpeedModel(prop.speed);
    this.abilityBonuses = prop.abilityBonuses.map((ab) => new AbilityBonusModel(Object.assign({}, AbilityBonusModel.getEmpty(), ab)));
    this.startProficiencies = prop.startProficiencies.map((p) => new ProficiencyModel(Object.assign({}, ProficiencyModel.getEmpty(), p)));
    this.languages = prop.languages.map((l) => new LanguageListItemModel(Object.assign({}, LanguageListItemModel.getEmpty(), l)));
    this.traits = prop.traits.map((trait) => new TraitModel(Object.assign({}, TraitModel.getEmpty(), trait)));
    this.subraces = prop.subraces.map(
      (subrace) =>
        new SubraceModel(
          Object.assign({}, SubraceModel.getEmpty(), {
            ...subrace,
            race: this,
          })
        )
    );
  }
  static getEmpty() {
    return new RaceViewItemModel({
      id: NaN,
      index: '',
      name: '',
      alignment: '',
      languageDesc: '',
      size: BeastSizeModel.getEmpty(),
      sizeDescription: '',
      speed: SpeedModel.getEmpty(),
      abilityBonuses: new Array<IAbilityBonus>(),
      startProficiencies: new Array<IProficiency>(),
      languages: new Array<ILanguageListItemModel>(),
      traits: new Array<ITraitModel>(),
      subraces: new Array<ISubraceModel>(),
    });
  }
}
