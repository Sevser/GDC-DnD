import { Actions, IActions } from '../Actions/Actions';
import { ArmorClass, IArmorClass } from '../ArmorClass/ArmorClass';
import { BaseCharacteristics, IBaseCharacteristics } from '../BaseCharacteristics/BaseCharacteristics';
import { DamageTypeModel, IDamageTypeModel } from '../DamageType/DamageType';
import { ISenses, Senses } from '../Senses/senses';
import { ISpeedModel, SpeedModel } from '../speed/Speed';
import { BeastChallengeRating } from './BeastChallengeRating';
import { BeastSizeModel, IBeastSizeModel } from './BeastSize';
import { BeastType } from './BeastType';

export interface IBeastModel {
  id: number;
  hit_points: number;
  hit_dice: string;
  hit_points_roll: string;
  Size: IBeastSizeModel;
  base_characteristic: IBaseCharacteristics;
  speed: ISpeedModel;
  name: string;
  xp: number;
  type: BeastType;
  challenge_rating: BeastChallengeRating;
  languages: string;
  alignment: {
    alignment: string;
  };
  senses: ISenses;
  armorClass: IArmorClass[];
  actions: IActions[];
  legendaryAction: IActions[];
  damageImmunities: IDamageTypeModel[];
  damageResistances: IDamageTypeModel[];
  damageVulnerabilities: IDamageTypeModel[];
  specialAbilities: IActions[];
}

export class BeastModel implements IBeastModel {
  id: number;
  hit_points: number;
  hit_dice: string;
  hit_points_roll: string;
  Size: IBeastSizeModel;
  base_characteristic: BaseCharacteristics;
  speed: ISpeedModel;
  name: string;
  xp: number;
  type: BeastType;
  challenge_rating: BeastChallengeRating;
  languages: string;
  alignment: {
    alignment: string;
  };
  senses: ISenses;
  armorClass: IArmorClass[];
  actions: IActions[];
  legendaryAction: IActions[];
  specialAbilities: IActions[];
  damageImmunities: IDamageTypeModel[];
  damageResistances: IDamageTypeModel[];
  damageVulnerabilities: IDamageTypeModel[];
  constructor(prop?: IBeastModel) {
    if (!prop) {
      prop = BeastModel.getEmpty();
    }
    this.id = prop.id;
    this.hit_dice = prop.hit_dice;
    this.hit_points = prop.hit_points;
    this.hit_points_roll = prop.hit_points_roll;
    this.Size = prop.Size;
    this.base_characteristic = new BaseCharacteristics(prop.base_characteristic);
    this.senses = new Senses(prop.senses);
    this.speed = new SpeedModel(prop.speed);
    this.name = prop.name;
    this.xp = prop.xp;
    this.type = prop.type;
    this.challenge_rating = prop.challenge_rating;
    this.languages = prop.languages;
    this.alignment = prop.alignment;
    this.armorClass = prop.armorClass.map((item) => new ArmorClass(item));
    this.actions = prop.actions.map((action) => new Actions(action));
    this.legendaryAction = prop.legendaryAction.map((action) => new Actions(action));
    this.specialAbilities = prop.specialAbilities.map((action) => new Actions(action));
    this.damageImmunities = prop.damageImmunities.map((damage) => new DamageTypeModel(damage));
    this.damageResistances = prop.damageResistances.map((damage) => new DamageTypeModel(damage));
    this.damageVulnerabilities = prop.damageVulnerabilities.map((damage) => new DamageTypeModel(damage));
  }
  static getEmpty() {
    return new BeastModel({
      id: NaN,
      hit_dice: '',
      hit_points: NaN,
      hit_points_roll: '',
      Size: BeastSizeModel.getEmpty(),
      base_characteristic: BaseCharacteristics.getEmpty(),
      senses: Senses.getEmpty(),
      speed: SpeedModel.getEmpty(),
      name: '',
      xp: NaN,
      type: 'aberration',
      challenge_rating: 0,
      languages: '',
      alignment: { alignment: '' },
      armorClass: new Array<IArmorClass>(),
      actions: new Array<IActions>(),
      specialAbilities: new Array<IActions>(),
      legendaryAction: new Array<IActions>(),
      damageImmunities: new Array<IDamageTypeModel>(),
      damageResistances: new Array<IDamageTypeModel>(),
      damageVulnerabilities: new Array<IDamageTypeModel>(),
    });
  }
}
