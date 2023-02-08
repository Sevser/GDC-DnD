import { ICMSClientDictionariesFetchType } from '@/plugins/http/cmsClient';
import { AlignmentModel } from '../Alignment/Alignment';
import { ConditionModel } from '../Condition/Condition';
import { DictionaryTypePropName } from '../constants';
import { DamageTypeEntityModel } from '../DamageType/DamageTypeEntity';
import { MagicSchoolModel } from '../MagicSchools/MagicSchool';
import { ProficiencyModel } from '../Proficiency/Proficiency';
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

export type AllowedDictionaryClasses = DamageTypeEntityModel | ConditionModel | AlignmentModel | MagicSchoolModel | WeaponPropertyModel | ProficiencyModel;

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
