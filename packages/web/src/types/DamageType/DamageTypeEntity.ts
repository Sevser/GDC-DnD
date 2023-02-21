import DefaultDictionaryViewListItem from '@/components/dictionaries/DefaultDictionaryViewListItem';
import { cmsClient } from '@/plugins/http';
import { VueElement } from 'vue';
import { DictionaryTypePropName } from '../constants';
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
  [DictionaryTypePropName]: string;
  constructor(prop: IDamageTypeEntityModel) {
    this.desc = prop.desc;
    this.name = prop.name;
    this.index = prop.index;
    this[DictionaryTypePropName] = 'damage-type-entitys';
  }
  getDictionaryView() {
    return DefaultDictionaryViewListItem as any as VueElement;
  }
  [DictionaryTypePropName]: string;
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
