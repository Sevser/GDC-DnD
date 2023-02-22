import DefaultDictionaryViewListItem from '@/components/dictionaries/DefaultDictionaryViewListItem';
import { cmsClient } from '@/plugins/http';
import { DictionaryTypePropName } from '../constants';
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
  [DictionaryTypePropName]: string;
  constructor(prop: IWeaponProperty) {
    this.index = prop.index;
    this.name = prop.name;
    this.desc = prop.desc;
    this[DictionaryTypePropName] = 'weapon-properties';
  }
  getDictionaryView() {
    return DefaultDictionaryViewListItem;
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
