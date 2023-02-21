import DefaultDictionaryViewListItem from '@/components/dictionaries/DefaultDictionaryViewListItem';
import { cmsClient } from '@/plugins/http';
import { VueElement } from 'vue';
import { DictionaryTypePropName } from '../constants';
import { ICanBeDictionary } from '../Dictionaries/CanBeDictionary';

export interface IMagicSchool {
  index: string;
  name: string;
  desc: string;
}

export class MagicSchoolModel implements IMagicSchool, ICanBeDictionary {
  [DictionaryTypePropName]: string;
  index: string;
  name: string;
  desc: string;
  constructor(prop: IMagicSchool) {
    this[DictionaryTypePropName] = 'magic-schools';
    this.index = prop.index;
    this.name = prop.name;
    this.desc = prop.desc;
  }
  getDictionaryView() {
    return DefaultDictionaryViewListItem as any as VueElement;
  }
  [DictionaryTypePropName]: string;
  getCmsProvider() {
    return cmsClient.fetchMagicSchools;
  }
  static getEmpty() {
    return new MagicSchoolModel({
      index: '',
      name: '',
      desc: '',
    });
  }
}
