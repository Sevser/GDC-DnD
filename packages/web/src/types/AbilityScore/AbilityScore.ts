import { cmsClient } from '@/plugins/http';
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
    if (prop.skills && prop.skills.length && prop.skills[0] instanceof SkillModel) {
      this.skills = prop.skills;
    } else if (prop.skills) {
      this.skills = prop.skills.map(
        (sk) =>
          new SkillModel({
            ...sk,
            ability: this,
          })
      );
    } else {
      this.skills = new Array<ISkill>();
    }
    this[DictionaryTypePropName] = 'ability-score';
  }
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
