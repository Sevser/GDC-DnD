import ProficiencyDictionaryViewListItem from '@/components/dictionaries/ProficiencyDictionaryViewListItem';
import { cmsClient } from '@/plugins/http';
import { ChacacterClassModel, ICharacterClass } from '../CharacterClass';
import { DictionaryTypePropName } from '../constants';
import { ICanBeDictionary } from '../Dictionaries/CanBeDictionary';
import { IRace, RaceModel } from '../Race/RaceListItem';

export interface IProficiencyModel {
  index: string;
  name: string;
  type: string;
  classes: ICharacterClass[];
  races: IRace[];
}

export class ProficiencyModel implements IProficiencyModel, ICanBeDictionary {
  index: string;
  name: string;
  type: string;
  classes: ICharacterClass[];
  races: IRace[];
  [DictionaryTypePropName]: string;
  desc?: string | undefined;
  constructor(prop: IProficiencyModel) {
    this[DictionaryTypePropName] = 'proficiencies';
    this.index = prop.index;
    this.name = prop.name;
    this.type = prop.type;
    this.classes = prop.classes.map((cl) => new ChacacterClassModel(cl));
    this.races = prop.races.map((rc) => new RaceModel(rc));
  }
  getDictionaryView() {
    return ProficiencyDictionaryViewListItem;
  }
  getCmsProvider() {
    return cmsClient.fetchProficiency;
  }
  static getEmpty() {
    return new ProficiencyModel({
      index: '',
      name: '',
      type: '',
      classes: new Array<ICharacterClass>(),
      races: new Array<IRace>(),
    });
  }
}
