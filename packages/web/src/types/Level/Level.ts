import { FeatureItemModel, IFeatureItem } from '../Feature/Feature';

export interface ISpellCasting {
  cantripsKnown: number;
  spellsKnown: number;
  spellSlotsLevel1: number;
  spellSlotsLevel2: number;
  spellSlotsLevel3: number;
  spellSlotsLevel4: number;
  spellSlotsLevel5: number;
  spellSlotsLevel6: number;
  spellSlotsLevel7: number;
  spellSlotsLevel8: number;
  spellSlotsLevel9: number;
}

export interface ILevelModel {
  id: number;
  index: string;
  name: string;
  level: number;
  spellcasting: ISpellCasting;
  profBonus: number;
  features: IFeatureItem[];
}

export class LevelModel implements ILevelModel {
  id: number;
  index: string;
  name: string;
  level: number;
  spellcasting: ISpellCasting;
  profBonus: number;
  features: IFeatureItem[];
  constructor(prop: ILevelModel) {
    this.id = prop.id;
    this.index = prop.index;
    this.name = prop.name;
    this.level = prop.level;
    this.profBonus = prop.profBonus;
    this.features = prop.features.map((f) => new FeatureItemModel(f));
    this.spellcasting = prop.spellcasting;
  }
  static getEmpty() {
    return new LevelModel({
      id: NaN,
      index: '',
      name: '',
      spellcasting: {} as ISpellCasting,
      profBonus: NaN,
      features: new Array<IFeatureItem>(),
      level: NaN,
    });
  }
}
