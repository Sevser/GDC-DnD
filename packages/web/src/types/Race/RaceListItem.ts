import { AbilityBonusModel, IAbilityBonus } from '../AbilityBonus/AbilityBonus';

export type RaceType = 'Gnome' | 'Dwarf' | 'Dragonborn' | 'Half-orc' | 'Halfing' | 'Half-elf' | 'Tiefling' | 'Human' | 'Elf' | 'None';

export interface IRace {
  Race: RaceType;
}

export class RaceModel implements IRace {
  Race: RaceType;
  constructor(prop: IRace) {
    this.Race = prop.Race;
  }
  static getEmpty() {
    return new RaceModel({
      Race: 'None',
    });
  }
}

export interface IRaceListItemModel {
  name: string;
  id: number;
  tabDescription: string;
  abilityBonuses: IAbilityBonus[];
}

export class RaceListItemModel implements IRaceListItemModel {
  name: string;
  id: number;
  tabDescription: string;
  abilityBonuses: IAbilityBonus[];
  constructor(prop: IRaceListItemModel) {
    this.name = prop.name;
    this.tabDescription = prop.tabDescription;
    this.id = prop.id;
    this.abilityBonuses = prop.abilityBonuses.map((ab) => new AbilityBonusModel(Object.assign({}, AbilityBonusModel.getEmpty(), ab)));
  }
  static getEmpty() {
    return new RaceListItemModel({
      name: '',
      id: NaN,
      tabDescription: '',
      abilityBonuses: new Array<IAbilityBonus>(),
    });
  }
}
