import { cmsClient } from '@/plugins/http';
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
    if (prop.ability instanceof AbilityScoreModel) {
      this.ability = prop.ability;
    } else {
      this.ability = new AbilityScoreModel({
        ...prop.ability,
        skills: [this],
      });
    }
    this[DictionaryTypePropName] = 'skills';
  }
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
