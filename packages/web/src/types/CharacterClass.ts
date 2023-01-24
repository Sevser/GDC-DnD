export type ChacacterClass = 'Bard' | 'Barbarian' | 'Fighter' | 'Wizard' | 'Druid' | 'Cleric' | 'Warlock' | 'Monk' | 'Paladin' | 'Rogue' | 'Ranger' | 'Sorcerer';

export interface ICharacterClass {
  class: ChacacterClass;
  id: number;
}
