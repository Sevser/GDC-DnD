export type ChacacterClass = 'Bard' | 'Barbarian' | 'Fighter' | 'Wizard' | 'Druid' | 'Cleric' | 'Warlock' | 'Monk' | 'Paladin' | 'Rogue' | 'Ranger' | 'Sorcerer' | 'None';

export interface ICharacterClass {
  name: ChacacterClass;
  index: string;
  id: number;
}

export class ChacacterClassModel implements ICharacterClass {
  index: string;
  name: ChacacterClass;
  id: number;
  constructor(prop: ICharacterClass) {
    this.name = prop.name;
    this.index = prop.index;
    this.id = prop.id;
  }
  static getEmpty() {
    return new ChacacterClassModel({
      name: 'None',
      index: '',
      id: NaN,
    });
  }
}
