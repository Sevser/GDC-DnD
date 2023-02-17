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
    this.abilityBonuses = prop.abilityBonuses.map((ab) => {
      if (ab instanceof AbilityBonusModel) {
        return ab;
      }
      return new AbilityBonusModel(ab);
    });
    this.startProficiencies = prop.startProficiencies.map((p) => {
      if (p instanceof ProficiencyModel) {
        return p;
      }
      return new ProficiencyModel(p);
    });
    this.languages = prop.languages.map((l) => {
      if (l instanceof LanguageListItemModel) {
        return l;
      }
      return new LanguageListItemModel(l);
    });
    this.traits = prop.traits.map((trait) => {
      if (trait instanceof TraitModel) {
        return trait;
      }
      return new TraitModel(trait);
    });
    this.subraces = prop.subraces.map((trait) => {
      if (trait instanceof SubraceModel) {
        return trait;
      }
      return new SubraceModel({
        ...trait,
        race: this,
      });
    });
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
