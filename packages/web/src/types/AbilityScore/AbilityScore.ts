import AbilityScoreDictionaryViewListItem from '@/components/dictionaries/AbilityScoreDictionaryViewListItem';
import { cmsClient } from '@/plugins/http';
import { VueElement } from 'vue';
import { DictionaryTypePropName } from '../constants';
import { ICanBeDictionary } from '../Dictionaries/CanBeDictionary';
import { ISkill, SkillModel } from '../Skills/Skills';

export interface IAbilityScore {
  index: string;
  name: string;
  fullName: string;
  desc: string;
  skills: ISkill[];
}

export class AbilityScoreModel implements IAbilityScore, ICanBeDictionary {
  [DictionaryTypePropName]: string;
  index: string;
  name: string;
  fullName: string;
  desc: string;
  skills: ISkill[];
  constructor(prop: IAbilityScore) {
    this.index = prop.index;
    this.name = prop.name;
    this.fullName = prop.fullName;
    this.desc = prop.desc;
    this.skills = prop.skills.map(
      (skill) =>
        new SkillModel(
          Object.assign({}, SkillModel.getEmpty(), {
            ...skill,
          })
        )
    );
    this[DictionaryTypePropName] = 'ability-score';
  }
  getDictionaryView() {
    return AbilityScoreDictionaryViewListItem as any as VueElement;
  }
  [DictionaryTypePropName]: string;
  static getEmpty() {
    return new AbilityScoreModel({
      index: '',
      name: '',
      fullName: '',
      desc: '',
      skills: new Array<ISkill>(),
    });
  }
  getCmsProvider() {
    return cmsClient.fetchAbilityScores;
  }
}
