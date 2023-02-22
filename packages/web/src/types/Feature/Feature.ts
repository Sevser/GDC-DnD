import DefaultDictionaryViewListItem from '@/components/dictionaries/DefaultDictionaryViewListItem';
import { cmsClient } from '@/plugins/http';
import { DictionaryTypePropName } from '../constants';
import { ICanBeDictionary } from '../Dictionaries/CanBeDictionary';

export interface IFeatureItem {
  index: string;
  name: string;
  level: string | number;
  desc: string;
  id: number;
  class: any;
  subclass: any;
  parent?: IFeatureItem;
}

// todo fix subclass & class & add personal view model

export class FeatureItemModel implements IFeatureItem, ICanBeDictionary {
  subclass: any;
  index: string;
  name: string;
  level: string | number;
  desc: string;
  id: number;
  parent?: IFeatureItem | undefined;
  class: any;
  [DictionaryTypePropName]: string;
  constructor(prop: IFeatureItem) {
    this.id = prop.id;
    this.index = prop.index;
    this.level = prop.level;
    this.desc = prop.desc;
    this.name = prop.name;
    this.subclass = prop.subclass;
    this.class = prop.class;
    this[DictionaryTypePropName] = 'feature';
  }
  getDictionaryView() {
    return DefaultDictionaryViewListItem;
  }
  static getEmpty() {
    return new FeatureItemModel({
      id: NaN,
      index: '',
      level: '',
      name: '',
      desc: '',
      class: {},
      subclass: {},
    });
  }
  getCmsProvider() {
    return cmsClient.fetchFeatures;
  }
}
