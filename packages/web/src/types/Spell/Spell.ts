import { ActionType } from '../Action';
import { ChacacterClass, ChacacterClassModel, ICharacterClass } from '../CharacterClass';
import { ClassListItemModel, IClassListItemModel } from '../Class/ClassListItemModel';
import { DamageType, DamageTypeModel, IDamageTypeModel } from '../DamageType/DamageType';
import { Distance, IDistance } from '../Distance';
import { IFilter } from '../Filters';
import { ISchoolOfMagic, SchoolOfMagicModel, SchoolOfMagicType } from '../MagicSchools/SchoolOfMagic';
import { ISource, Source } from '../Source';
import { ISpellComponent, SpellComponentModel } from '../SpellComponent';
import { ISpellSaveDifficultyClass, SpellSaveDifficultyClassModel } from '../SpellSaveDifficultyClass/SpellSaveDifficultyClass';

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
  classes: IClassListItemModel[];
  SpellComponent: ISpellComponent[];
  source: ISource;
  spellComponentDescription: string;
  distance: IDistance;
  damageType: IDamageTypeModel;
  spellSaveDifficultyClass: ISpellSaveDifficultyClass;
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
    this.id = prop.id;
    this.classes = prop.classes.map((p) => new ClassListItemModel(Object.assign({}, ClassListItemModel.getEmpty(), p)));
    this.SpellComponent = prop.SpellComponent ? prop.SpellComponent.map((sc) => new SpellComponentModel(sc)) : new Array<SpellComponentModel>();
    this.spellComponentDescription = prop.spellComponentDescription;
    this.source = prop.source;
    this.damageType = prop.damageType ? new DamageTypeModel(prop.damageType) : DamageTypeModel.getEmpty();
    this.source = prop.source ? new Source(prop.source) : Source.getEmpty();
    this.distance = prop.distance ? new Distance(prop.distance) : Distance.getEmpty();
    this.SchoolOfMagic = prop.SchoolOfMagic ? new SchoolOfMagicModel(prop.SchoolOfMagic) : SchoolOfMagicModel.getEmpty();
    this.spellSaveDifficultyClass = prop.spellSaveDifficultyClass ? new SpellSaveDifficultyClassModel(prop.spellSaveDifficultyClass) : SpellSaveDifficultyClassModel.getEmpty();
  }
  spellSaveDifficultyClass: ISpellSaveDifficultyClass;
  static getEmpty() {
    return new Spell({
      source: Source.getEmpty(),
      SpellComponent: new Array<SpellComponentModel>(),
      classes: new Array<IClassListItemModel>(),
      SchoolOfMagic: SchoolOfMagicModel.getEmpty(),
      id: NaN,
      title: '',
      description: '',
      HighterLevelDescription: '',
      Level: NaN,
      Concentration: false,
      actionTypeDescription: '',
      spellComponentDescription: '',
      activeTime: '',
      distance: Distance.getEmpty(),
      damageType: DamageTypeModel.getEmpty(),
      spellSaveDifficultyClass: SpellSaveDifficultyClassModel.getEmpty(),
    });
  }
  source: ISource;
  SpellComponent: ISpellComponent[];
  classes: IClassListItemModel[];
  SchoolOfMagic: ISchoolOfMagic;
  id: number;
  title: string;
  description: string;
  HighterLevelDescription: string;
  Level: number;
  Concentration: boolean;
  actionTypeDescription: string;
  spellComponentDescription: string;
  activeTime: string;
  distance: IDistance;
  damageType: DamageTypeModel;
}

export interface IShortSpell {
  title: string;
  SpellComponent: ISpellComponent[];
  Concentration: boolean;
  classes: ICharacterClass[];
  Level: number;
  ActionType: any;
  id: number;
}

export class ShortSpellModel implements IShortSpell {
  title: string;
  SpellComponent: ISpellComponent[];
  Concentration: boolean;
  classes: ICharacterClass[];
  Level: number;
  ActionType: any;
  id: number;
  constructor(prop: IShortSpell) {
    this.title = prop.title;
    this.Concentration = prop.Concentration;
    this.id = prop.id;
    this.Level = prop.Level;
    this.classes = prop.classes.map((p) => new ChacacterClassModel(Object.assign({}, ChacacterClassModel.getEmpty(), p)));
    this.SpellComponent = prop.SpellComponent.map((p) => new SpellComponentModel(Object.assign({}, SpellComponentModel.getEmpty(), p)));
  }
  static getEmpty() {
    return new ShortSpellModel({
      title: '',
      SpellComponent: new Array<ISpellComponent>(),
      Concentration: false,
      classes: new Array<ICharacterClass>(),
      ActionType: {},
      id: NaN,
      Level: NaN,
    });
  }
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
      filters.classes = {
        index: {
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
