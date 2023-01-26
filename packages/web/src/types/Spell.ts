import { ActionType } from './Action';
import { ChacacterClass, ICharacterClass } from './CharacterClass';
import { DamageType } from './DamageType';
import { IFilter } from './Filters';
import { ISchoolOfMagic, SchoolOfMagicType } from './SchoolOfMagic';
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

export interface IShortSpell {
  title: string;
  SpellComponent: ISpellComponent[];
  Concentration: boolean;
  class: ICharacterClass[];
  ActionType: true;
}

export interface ISpellFilters extends IFilter {
  level?: number;
  concentration?: boolean;
  class?: ChacacterClass;
  school?: SchoolOfMagicType;
  action?: ActionType;
  damage?: DamageType;
}

export class SpellFilters implements ISpellFilters {
  level?: number;
  concentration?: boolean;
  class?: ChacacterClass;
  school?: SchoolOfMagicType;
  action?: ActionType;
  damage?: DamageType;
  constructor(filters: Partial<ISpellFilters>) {
    this.level = filters.level;
    this.concentration = filters.concentration;
    this.class = filters.class;
    this.school = filters.school;
    this.action = filters.action;
    this.damage = filters.damage;
  }
  get forParams() {
    const filters: any = {};
    if (this.level) {
      filters.level = {
        $in: this.level,
      };
    }
    if (this.concentration !== undefined) {
      filters.Concentration = {
        $eq: this.concentration,
      };
    }
    if (this.class) {
      filters.class = {
        class: {
          $in: this.class,
        },
      };
    }
    if (this.school) {
      filters.SchoolOfMagic = {
        SchoolOfMagic: {
          $in: this.school,
        },
      };
    }
    if (this.action) {
      filters.ActionType = {
        actionType: {
          $eq: this.action,
        },
      };
    }
    return filters;
  }
}
