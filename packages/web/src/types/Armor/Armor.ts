import { CostModel, ICostModel } from '../Common/Cost';
import { ArmorClassEquipment, IArmorClassEquipment } from './ArmorClassEquipment';

export interface IArmorModel {
  id: number;
  cost: ICostModel;
  stealthDisadvantage: boolean;
  index: string;
  name: string;
  armorCategory: string;
  armorClassEquipment: IArmorClassEquipment;
  strMinimum: number;
  weight: number;
}

export class ArmorModel implements IArmorModel {
  id: number;
  cost: ICostModel;
  stealthDisadvantage: boolean;
  index: string;
  name: string;
  armorCategory: string;
  armorClassEquipment: IArmorClassEquipment;
  strMinimum: number;
  weight: number;
  constructor(prop: IArmorModel) {
    this.id = prop.id;
    this.cost = new CostModel(prop.cost);
    this.stealthDisadvantage = prop.stealthDisadvantage;
    this.index = prop.index;
    this.armorCategory = prop.armorCategory;
    this.name = prop.name;
    this.strMinimum = prop.strMinimum;
    this.weight = prop.weight;
    this.armorClassEquipment = new ArmorClassEquipment(prop.armorClassEquipment);
  }
  static getEmpty() {
    return new ArmorModel({
      id: NaN,
      cost: CostModel.getEmpty(),
      stealthDisadvantage: false,
      index: '',
      armorCategory: '',
      name: '',
      strMinimum: NaN,
      weight: NaN,
      armorClassEquipment: ArmorClassEquipment.getEmpty(),
    });
  }
}
