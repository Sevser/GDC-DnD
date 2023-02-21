import SkillDictionaryViewListItem from '@/components/dictionaries/SkillDictionaryViewListItem';
import { cmsClient } from '@/plugins/http';
import { VueElement } from 'vue';
import { AbilityScoreModel, IAbilityScore } from '../AbilityScore/AbilityScore';
import { DictionaryTypePropName } from '../constants';
import { ICanBeDictionary } from '../Dictionaries/CanBeDictionary';

export interface ISkill {
  index: string;
  name: string;
  desc: string;
  ability: IAbilityScore;
}

export class SkillModel implements ISkill, ICanBeDictionary {
  index: string;
  name: string;
  desc: string;
  ability: IAbilityScore;
  [DictionaryTypePropName]: string;
  constructor(prop: ISkill) {
    this.index = prop.index;
    this.desc = prop.desc;
    this.name = prop.name;
    this.ability = new AbilityScoreModel(
      Object.assign({}, AbilityScoreModel.getEmpty(), {
        ...prop.ability,
      })
    );
    this[DictionaryTypePropName] = 'skills';
  }
  getDictionaryView() {
    return SkillDictionaryViewListItem as any as VueElement;
  }
  [DictionaryTypePropName]: string;
  static getEmpty() {
    return new SkillModel({
      index: '',
      name: '',
      desc: '',
      ability: AbilityScoreModel.getEmpty(),
    });
  }
  getCmsProvider() {
    return cmsClient.fetchSkills;
  }
}
