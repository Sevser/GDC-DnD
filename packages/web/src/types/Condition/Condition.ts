import DefaultDictionaryViewListItem from '@/components/dictionaries/DefaultDictionaryViewListItem';
import { cmsClient } from '@/plugins/http';
import { DictionaryTypePropName } from '../constants';
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
  [DictionaryTypePropName]: string;
  constructor(prop: IConditionModel) {
    this.index = prop.index;
    this.name = prop.name;
    this.desc = prop.desc;
    this[DictionaryTypePropName] = 'conditions';
  }
  getDictionaryView() {
    return DefaultDictionaryViewListItem;
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
