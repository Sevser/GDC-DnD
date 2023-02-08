import { cmsClient } from '@/plugins/http';
import { ICanBeDictionary } from '../Dictionaries/CanBeDictionary';

export type DamageTypeEntityModelName = 'damage-type-entitys';

export interface IDamageTypeEntityModel {
  index: string;
  name: string;
  desc: string;
}

export class DamageTypeEntityModel implements IDamageTypeEntityModel, ICanBeDictionary {
  index: string;
  name: string;
  desc: string;
  type: string;
  constructor(prop: IDamageTypeEntityModel) {
    this.desc = prop.desc;
    this.name = prop.name;
    this.index = prop.index;
    this.type = 'damage-type-entitys';
  }
  static getEmpty() {
    return new DamageTypeEntityModel({
      desc: '',
      name: '',
      index: '',
    });
  }
  getCmsProvider() {
    return cmsClient.fetchDamageTypeEntity;
  }
}
