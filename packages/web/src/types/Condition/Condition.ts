import { cmsClient } from '@/plugins/http';
import { ICanBeDictionary } from '../Dictionaries/CanBeDictionary';

export type ConditionModelName = 'conditions';

export interface IConditionModel {
  index: string;
  name: string;
  desc: string;
}

export class ConditionModel implements IConditionModel, ICanBeDictionary {
  index: string;
  name: string;
  desc: string;
  type: string;
  constructor(prop: IConditionModel) {
    this.index = prop.index;
    this.name = prop.name;
    this.desc = prop.desc;
    this.type = 'conditions';
  }
  static getEmpty() {
    return new ConditionModel({
      index: '',
      name: '',
      desc: '',
    });
  }
  getCmsProvider() {
    return cmsClient.fetchConditions;
  }
}
