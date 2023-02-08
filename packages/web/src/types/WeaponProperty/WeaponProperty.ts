import { cmsClient } from '@/plugins/http';
import { ICanBeDictionary } from '../Dictionaries/CanBeDictionary';

export type ConditionModelName = 'conditions';

export interface IWeaponProperty {
  index: string;
  name: string;
  desc: string;
}

export class WeaponPropertyModel implements IWeaponProperty, ICanBeDictionary {
  index: string;
  name: string;
  desc: string;
  type: string;
  constructor(prop: IWeaponProperty) {
    this.index = prop.index;
    this.name = prop.name;
    this.desc = prop.desc;
    this.type = 'weapon-properties';
  }
  static getEmpty() {
    return new WeaponPropertyModel({
      index: '',
      name: '',
      desc: '',
    });
  }
  getCmsProvider() {
    return cmsClient.fetchWeaponProperties;
  }
}
