import { CostModel, ICostModel } from '../Common/Cost';
import { DamageModel, IDamageModel } from '../Damage/Damage';
import { IRangeModel, RangeModel } from '../Range/Range';
import { IWeaponProperty, WeaponPropertyModel } from '../WeaponProperty/WeaponProperty';

export interface IWeaponModel {
  id: number;
  categoryRange: string;
  cost: ICostModel;
  desc: string;
  index: string;
  name: string;
  range: IRangeModel;
  weaponProperties: IWeaponProperty[];
  damage: IDamageModel;
  weight: number;
  weaponRange: string;
}

export class WeaponModel implements IWeaponModel {
  id: number;
  categoryRange: string;
  cost: ICostModel;
  desc: string;
  index: string;
  name: string;
  range: IRangeModel;
  weaponProperties: IWeaponProperty[];
  damage: IDamageModel;
  weight: number;
  weaponRange: string;
  constructor(prop: IWeaponModel) {
    this.id = prop.id;
    this.cost = new CostModel(prop.cost);
    this.desc = prop.desc;
    this.index = prop.index;
    this.name = prop.name;
    this.categoryRange = prop.categoryRange;
    this.weight = prop.weight;
    this.weaponRange = prop.weaponRange;
    this.range = new RangeModel(Object.assign({}, prop.range));
    this.damage = new DamageModel(Object.assign({}, prop.damage));
    this.weaponProperties = prop.weaponProperties.map((p) => new WeaponPropertyModel(p));
  }
  static getEmpty() {
    return new WeaponModel({
      id: NaN,
      categoryRange: '',
      cost: CostModel.getEmpty(),
      desc: '',
      index: '',
      name: '',
      weight: NaN,
      weaponRange: '',
      range: RangeModel.getEmpty(),
      weaponProperties: [],
      damage: DamageModel.getEmpty(),
    });
  }
}
