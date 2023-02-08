export type ChacacterClass = 'Bard' | 'Barbarian' | 'Fighter' | 'Wizard' | 'Druid' | 'Cleric' | 'Warlock' | 'Monk' | 'Paladin' | 'Rogue' | 'Ranger' | 'Sorcerer' | 'None';

export interface ICharacterClass {
  class: ChacacterClass;
  id: number;
}

export class ChacacterClassModel implements ICharacterClass {
  class: ChacacterClass;
  id: number;
  constructor(prop: ICharacterClass) {
    this.class = prop.class;
    this.id = prop.id;
  }
  static getEmpty() {
    return new ChacacterClassModel({
      class: 'None',
      id: NaN,
    });
  }
}
