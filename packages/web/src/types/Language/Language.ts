import { cmsClient } from '@/plugins/http';
import { DictionaryTypePropName } from '../constants';
import { ICanBeDictionary } from '../Dictionaries/CanBeDictionary';

export interface ILanguageListItem {
  index: string;
  name: string;
  script: string;
  type: string;
  id: number;
}

export class LanguageListItemModel implements ILanguageListItem, ICanBeDictionary {
  index: string;
  name: string;
  script: string;
  type: string;
  id: number;
  desc?: string | undefined;
  [DictionaryTypePropName]: string;
  constructor(prop: ILanguageListItem) {
    this.index = prop.index;
    this.name = prop.name;
    this.script = prop.script;
    this.type = prop.type;
    this.id = prop.id;
    this[DictionaryTypePropName] = 'language';
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
