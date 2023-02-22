import TraitDictionaryViewListItem from '@/components/dictionaries/TraitDictionaryViewListItem';
import { cmsClient } from '@/plugins/http';
import { DictionaryTypePropName } from '../constants';
import { ICanBeDictionary } from '../Dictionaries/CanBeDictionary';
import { IProficiencyModel, ProficiencyModel } from '../Proficiency/Proficiency';

export interface ITraitDictionaryItem {
  id: number;
  index: string;
  name: string;
  desc: string;
  proficiencies: IProficiencyModel[];
}

export class TraitDictionaryItem implements ITraitDictionaryItem, ICanBeDictionary {
  id: number;
  index: string;
  name: string;
  desc: string;
  proficiencies: IProficiencyModel[];
  [DictionaryTypePropName]: string;
  constructor(prop: ITraitDictionaryItem) {
    this.id = prop.id;
    this.index = prop.index;
    this.name = prop.name;
    this.desc = prop.desc;
    this.proficiencies = prop.proficiencies.map((p) => new ProficiencyModel(Object.assign({}, ProficiencyModel.getEmpty(), p)));
    this[DictionaryTypePropName] = 'trait';
  }
  getDictionaryView() {
    return TraitDictionaryViewListItem;
  }
  [DictionaryTypePropName]: string;
  getCmsProvider() {
    return cmsClient.fetchTraits;
  }
  static getEmpty() {
    return new TraitDictionaryItem({
      id: NaN,
      index: '',
      name: '',
      desc: '',
      proficiencies: new Array<ProficiencyModel>(),
    });
  }
}
