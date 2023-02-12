import { ICMSClientDictionariesFetchType } from '@/plugins/http/cmsClient';
import { AbilityScoreModel } from '../AbilityScore/AbilityScore';
import { AlignmentModel } from '../Alignment/Alignment';
import { ConditionModel } from '../Condition/Condition';
import { DictionaryTypePropName } from '../constants';
import { DamageTypeEntityModel } from '../DamageType/DamageTypeEntity';
import { FeatureItemModel } from '../Feature/Feature';
import { LanguageListItemModel } from '../Language/Language';
import { MagicSchoolModel } from '../MagicSchools/MagicSchool';
import { ProficiencyModel } from '../Proficiency/Proficiency';
import { SkillModel } from '../Skills/Skills';
import { WeaponPropertyModel } from '../WeaponProperty/WeaponProperty';

export interface ICanBeDictionary {
  [DictionaryTypePropName]: string;
  index: string;
  name: string;
  desc?: string;
  getCmsProvider: () => ICMSClientDictionariesFetchType;
}

export interface ICanBeDictionaryProvider {
  allowedClasses: AllowedDictionaryClasses[];
  getCmsProviderByType: (type: string) => ICMSClientDictionariesFetchType;
}

export type AllowedDictionaryClasses =
  | DamageTypeEntityModel
  | ConditionModel
  | AlignmentModel
  | MagicSchoolModel
  | WeaponPropertyModel
  | ProficiencyModel
  | AbilityScoreModel
  | SkillModel
  | FeatureItemModel
  | LanguageListItemModel;

export class CanBeDictionaryProvider implements ICanBeDictionaryProvider {
  allowedClasses: AllowedDictionaryClasses[];
  constructor() {
    this.allowedClasses = [
      DamageTypeEntityModel.getEmpty(),
      ConditionModel.getEmpty(),
      AlignmentModel.getEmpty(),
      MagicSchoolModel.getEmpty(),
      WeaponPropertyModel.getEmpty(),
      ProficiencyModel.getEmpty(),
      AbilityScoreModel.getEmpty(),
      SkillModel.getEmpty(),
      LanguageListItemModel.getEmpty(),
      FeatureItemModel.getEmpty(),
    ];
  }
  getCmsProviderByType(type: string) {
    const provider = this.allowedClasses.find((allowedClass: ICanBeDictionary) => allowedClass[DictionaryTypePropName] === type);
    if (provider) {
      return provider.getCmsProvider();
    }
    throw `can't find provider for ${type}`;
  }
}
