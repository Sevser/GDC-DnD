import { ICharacterClass } from './CharacterClass';
import { ISchoolOfMagic } from './SchoolOfMagic';
import { ISpellComponent } from './SpellComponent';

export interface ISpell {
  title: string;
  description: string;
  HighterLevelDescription: string;
  Level: number;
  Concentration: boolean;
  actionTypeDescription: string;
  activeTime: string;
  id: number;
  SchoolOfMagic: ISchoolOfMagic;
  class: ICharacterClass[];
  SpellComponent: ISpellComponent[];
}

export class Spell implements ISpell {
  constructor(prop: ISpell) {
    this.title = prop.title;
    this.description = prop.description;
    this.HighterLevelDescription = prop.HighterLevelDescription;
    this.Level = prop.Level;
    this.Concentration = prop.Concentration;
    this.actionTypeDescription = prop.actionTypeDescription;
    this.activeTime = prop.activeTime;
    this.description = prop.description;
    this.id = prop.id;
    this.SchoolOfMagic = prop.SchoolOfMagic;
    this.class = prop.class;
    this.SpellComponent = prop.SpellComponent;
  }
  SpellComponent: ISpellComponent[];
  class: ICharacterClass[];
  SchoolOfMagic: ISchoolOfMagic;
  id: number;
  title: string;
  description: string;
  HighterLevelDescription: string;
  Level: number;
  Concentration: boolean;
  actionTypeDescription: string;
  activeTime: string;
}
