import DefaultDictionaryViewListItem from '@/components/dictionaries/DefaultDictionaryViewListItem';
import { cmsClient } from '@/plugins/http';
import { VueElement } from 'vue';
import { DictionaryTypePropName } from '../constants';
import { ICanBeDictionary } from '../Dictionaries/CanBeDictionary';

export interface ILanguageListItemModel {
  index: string;
  name: string;
  script: string;
  type: string;
  id: number;
}

export class LanguageListItemModel implements ILanguageListItemModel, ICanBeDictionary {
  index: string;
  name: string;
  script: string;
  type: string;
  id: number;
  desc?: string | undefined;
  [DictionaryTypePropName]: string;
  constructor(prop: ILanguageListItemModel) {
    this.index = prop.index;
    this.name = prop.name;
    this.script = prop.script;
    this.type = prop.type;
    this.id = prop.id;
    this[DictionaryTypePropName] = 'language';
  }
  getDictionaryView() {
    return DefaultDictionaryViewListItem as any as VueElement;
  }
  getCmsProvider() {
    return cmsClient.fetchLanguages;
  }
  static getEmpty() {
    return new LanguageListItemModel({
      index: '',
      name: '',
      script: '',
      type: '',
      id: NaN,
    });
  }
}
