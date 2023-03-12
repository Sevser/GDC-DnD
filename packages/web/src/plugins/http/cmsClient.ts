import { AbilityScoreModel, IAbilityScore } from '@/types/AbilityScore/AbilityScore';
import { AlignmentModel, IAlignment } from '@/types/Alignment/Alignment';
import { ArmorModel, IArmorModel } from '@/types/Armor/Armor';
import { BeastModel, IBeastModel } from '@/types/beasts/Beast';
import { BeastListItem, IBeastListItem } from '@/types/beasts/BeastListItem';
import { CampaignListItem, CampaignListItemModel } from '@/types/Campaign/Campaign';
import { ClassListItemModel, IClassListItemModel } from '@/types/Class/ClassListItemModel';
import { ClassViewModel, IClassViewModel } from '@/types/Class/ClassViewModel';
import { ConditionModel, IConditionModel } from '@/types/Condition/Condition';
import { DamageTypeEntityModel, IDamageTypeEntityModel } from '@/types/DamageType/DamageTypeEntity';
import { DictionaryModel, IDictionary } from '@/types/Dictionaries/Dictionary';
import { EquipmentListItemModel, IEquipmentListItemModel } from '@/types/Equipment/EquipmentListItemModel';
import EquipmentModel, { IEquipmentModel } from '@/types/Equipment/EquipmentModel';
import { IMagicItemListItem, IMagicItemModel, MagicItemListItem, MagicItemModel } from '@/types/Equipment/MagicItem';
import { FeatureItemModel, IFeatureItem } from '@/types/Feature/Feature';
import { IAuthParams, IGenericQueryParams, IGenericStrapiData, IGenericStrapiMappedData, LoginStrapiResponse, RefreshTokenStrapiParams } from '@/types/GenericStrapiData';
import { ILanguageListItemModel, LanguageListItemModel } from '@/types/Language/Language';
import { ILevelModel, LevelModel } from '@/types/Level/Level';
import { IMagicSchool, MagicSchoolModel } from '@/types/MagicSchools/MagicSchool';
import { IProficiencyModel, ProficiencyModel } from '@/types/Proficiency/Proficiency';
import { IRaceListItemModel, RaceListItemModel } from '@/types/Race/RaceListItem';
import { IRaceViewItemModel, RaceViewItemModel } from '@/types/Race/RaceViewItem';
import { IRuleListItem, IRuleViewItem, RuleListItem, RuleViewItemModel } from '@/types/Rule/Rule';
import { ISkill, SkillModel } from '@/types/Skills/Skills';
import { Spell, IShortSpell, ShortSpellModel } from '@/types/Spell/Spell';
import { ISubclassModel, SubclassModel } from '@/types/Subclass/Subclass';
import { ITraitDictionaryItem, TraitDictionaryItem } from '@/types/Trait/TraitDictionaryItem';
import { IWeaponModel, WeaponModel } from '@/types/Weapon/Weapon';
import { IWeaponProperty, WeaponPropertyModel } from '@/types/WeaponProperty/WeaponProperty';
import httpClient from './httpClient';

const cmsUrl = import.meta.env.VITE_APP_CMS_HOST;

const login = async (params: IAuthParams): Promise<LoginStrapiResponse> => {
  const { data } = await httpClient.post(`${cmsUrl}/api/auth/local`, params);
  return data;
};

const refreshToken = async (params: RefreshTokenStrapiParams): Promise<LoginStrapiResponse> => {
  const { data } = await httpClient.post(`${cmsUrl}/api/auth/local`, params);
  return data;
};

const fetchSpells = async (params: IGenericQueryParams<IShortSpell>): Promise<IGenericStrapiMappedData<IShortSpell>> => {
  const result = await httpClient.get(`${cmsUrl}/api/spells`, {
    params,
  });
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<IShortSpell>) => new ShortSpellModel({ ...item.attributes, id: item.id })),
  };
};

const fetchArmor = async (): Promise<IGenericStrapiMappedData<IArmorModel>> => {
  const result = await httpClient.get(`${cmsUrl}/api/equipments/armor`);
  return result.data.map((item: IArmorModel) => new ArmorModel(item));
};

const fetchWeapon = async (): Promise<IGenericStrapiMappedData<IWeaponModel>> => {
  const result = await httpClient.get(`${cmsUrl}/api/equipments/weapons`);
  return result.data.map((item: IWeaponModel) => new WeaponModel(item));
};

const fetchEquipment = async (params: IGenericQueryParams<IEquipmentListItemModel>): Promise<IGenericStrapiMappedData<IEquipmentListItemModel>> => {
  const result = await httpClient.get(`${cmsUrl}/api/equipments`, {
    params,
  });
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IEquipmentListItemModel) => new EquipmentListItemModel(item)),
  };
};

const fetchEquipmentItem = async (equipmentId: string | number): Promise<IEquipmentModel> => {
  const result = await httpClient.get(`${cmsUrl}/api/equipments/${equipmentId}`);
  return new EquipmentModel(result.data);
};

const fetchMagicItems = async (params: IGenericQueryParams<IMagicItemListItem>): Promise<IGenericStrapiMappedData<IMagicItemListItem>> => {
  const result = await httpClient.get(`${cmsUrl}/api/magic-items`, {
    params,
  });
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IMagicItemListItem) => new MagicItemListItem(item)),
  };
};

const fetchSpell = async (spellId: string | number): Promise<Spell> => {
  const result = await httpClient.get(`${cmsUrl}/api/spells/${spellId}`);
  return new Spell({ ...result.data.data.attributes, id: result.data.data.id });
};

const fetchMagicItem = async (magicItemId: string | number): Promise<IMagicItemModel> => {
  const result = await httpClient.get(`${cmsUrl}/api/magic-items/${magicItemId}`);
  return new MagicItemModel(result.data);
};

const fetchBestiary = async (params: IGenericQueryParams<IBeastListItem>): Promise<IGenericStrapiMappedData<IBeastListItem>> => {
  const result = await httpClient.get(`${cmsUrl}/api/beasts`, {
    params,
  });
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<IBeastListItem>) => new BeastListItem({ ...item.attributes, id: item.id })),
  };
};

const fetchBeast = async (beastId: string | number): Promise<IBeastModel> => {
  const result = await httpClient.get(`${cmsUrl}/api/beasts/${beastId}`);
  return new BeastModel({
    id: result.data.data.id,
    ...result.data.data.attributes,
  });
};

const fetchDictionaries = async (): Promise<IGenericStrapiMappedData<IDictionary>> => {
  const result = await httpClient.get(`${cmsUrl}/api/dictionaries`);
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<IDictionary>) => new DictionaryModel({ ...item.attributes, id: item.id })),
  };
};

const fetchDamageTypeEntity = async (): Promise<IGenericStrapiMappedData<IDamageTypeEntityModel>> => {
  const result = await httpClient.get(`${cmsUrl}/api/damage-type-entitys`);
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<IDamageTypeEntityModel>) => new DamageTypeEntityModel({ ...item.attributes })),
  };
};

const fetchConditions = async (): Promise<IGenericStrapiMappedData<IConditionModel>> => {
  const result = await httpClient.get(`${cmsUrl}/api/conditions`);
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<IConditionModel>) => new ConditionModel({ ...item.attributes })),
  };
};

const fetchAlignments = async (): Promise<IGenericStrapiMappedData<IAlignment>> => {
  const result = await httpClient.get(`${cmsUrl}/api/alignments`);
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<IAlignment>) => new AlignmentModel({ ...item.attributes })),
  };
};

const fetchMagicSchools = async (): Promise<IGenericStrapiMappedData<IMagicSchool>> => {
  const result = await httpClient.get(`${cmsUrl}/api/magic-schools`);
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<IMagicSchool>) => new MagicSchoolModel({ ...item.attributes })),
  };
};

const fetchWeaponProperties = async (): Promise<IGenericStrapiMappedData<IWeaponProperty>> => {
  const result = await httpClient.get(`${cmsUrl}/api/weapon-properties`);
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<IWeaponProperty>) => new WeaponPropertyModel({ ...item.attributes })),
  };
};

const fetchProficiency = async (): Promise<IGenericStrapiMappedData<IProficiencyModel>> => {
  const result = await httpClient.get(`${cmsUrl}/api/proficiencies`);
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<IProficiencyModel>) => new ProficiencyModel({ ...item.attributes })),
  };
};

const fetchAbilityScores = async (): Promise<IGenericStrapiMappedData<IAbilityScore>> => {
  const result = await httpClient.get(`${cmsUrl}/api/ability-scores`);
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<IAbilityScore>) => new AbilityScoreModel({ ...item.attributes })),
  };
};

const fetchSkills = async (): Promise<IGenericStrapiMappedData<ISkill>> => {
  const result = await httpClient.get(`${cmsUrl}/api/skills`);
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<ISkill>) => new SkillModel({ ...item.attributes })),
  };
};

const fetchRules = async (): Promise<IGenericStrapiMappedData<IRuleListItem>> => {
  const result = await httpClient.get(`${cmsUrl}/api/rules`);
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<IRuleListItem>) => new RuleListItem({ ...item.attributes, id: item.id })),
  };
};

const fetchLanguages = async (): Promise<IGenericStrapiMappedData<ILanguageListItemModel>> => {
  const result = await httpClient.get(`${cmsUrl}/api/languages`);
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<ILanguageListItemModel>) => new LanguageListItemModel({ ...item.attributes, id: item.id })),
  };
};

const fetchFeatures = async (): Promise<IGenericStrapiMappedData<IFeatureItem>> => {
  const result = await httpClient.get(`${cmsUrl}/api/features`);
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<IFeatureItem>) => new FeatureItemModel({ ...item.attributes, id: item.id })),
  };
};

const fetchTraits = async (): Promise<IGenericStrapiMappedData<ITraitDictionaryItem>> => {
  const result = await httpClient.get(`${cmsUrl}/api/traits`);
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<ITraitDictionaryItem>) => new TraitDictionaryItem({ ...item.attributes, id: item.id })),
  };
};

const fetchRuleItem = async (ruleId: number | string): Promise<IRuleViewItem & IRuleListItem> => {
  const result = await httpClient.get(`${cmsUrl}/api/rules/${ruleId}`);
  return new RuleViewItemModel({
    id: result.data.data.id,
    ...result.data.data.attributes,
  });
};

const fetchRaces = async (): Promise<IGenericStrapiMappedData<IRuleListItem>> => {
  const result = await httpClient.get(`${cmsUrl}/api/races`);
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<IRaceListItemModel>) => new RaceListItemModel({ ...item.attributes, id: item.id, tabDescription: (item.attributes as any).alignment })),
  };
};

const fetchRace = async (raceId: string | number): Promise<IRaceViewItemModel> => {
  const result = await httpClient.get(`${cmsUrl}/api/races/${raceId}`);
  return new RaceViewItemModel({ ...result.data.data.attributes, id: result.data.data.id });
};

const fetchClasses = async (): Promise<IGenericStrapiMappedData<IClassListItemModel>> => {
  const result = await httpClient.get(`${cmsUrl}/api/classes`);
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<IClassListItemModel>) => new ClassListItemModel({ ...item.attributes, id: item.id })),
  };
};

const fetchCampaigns = async (): Promise<IGenericStrapiMappedData<CampaignListItem>> => {
  const result = await httpClient.get(`${cmsUrl}/api/campaigns`);
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: CampaignListItem) => new CampaignListItemModel(item)),
  };
};

const fetchLevels = async (classId: number): Promise<IGenericStrapiMappedData<ILevelModel>> => {
  const result = await httpClient.get(`${cmsUrl}/api/levels`, {
    params: {
      filters: {
        class: {
          id: {
            $eq: classId,
          },
        },
      },
    },
  });
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<ILevelModel>) => new LevelModel({ ...item.attributes, id: item.id })),
  };
};

const fetchArchetypes = async (classId: number): Promise<IGenericStrapiMappedData<ISubclassModel>> => {
  const result = await httpClient.get(`${cmsUrl}/api/subclasses`, {
    params: {
      filters: {
        class: {
          id: {
            $eq: classId,
          },
        },
      },
    },
  });
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<ISubclassModel>) => new SubclassModel({ ...item.attributes, id: item.id })),
  };
};

const fetchClass = async (raceId: string | number): Promise<IClassViewModel> => {
  const result = await httpClient.get(`${cmsUrl}/api/classes/${raceId}`);
  return new ClassViewModel({ ...result.data.data.attributes, id: result.data.data.id });
};

export interface ICMSClient {
  login: typeof login;
  fetchSpells: typeof fetchSpells;
  fetchSpell: typeof fetchSpell;
  fetchBeast: typeof fetchBeast;
  fetchDictionaries: typeof fetchDictionaries;
  fetchDamageTypeEntity: typeof fetchDamageTypeEntity;
  fetchConditions: typeof fetchConditions;
  fetchAlignments: typeof fetchAlignments;
  fetchMagicSchools: typeof fetchMagicSchools;
  fetchWeaponProperties: typeof fetchWeaponProperties;
  fetchProficiency: typeof fetchProficiency;
  fetchAbilityScores: typeof fetchAbilityScores;
  fetchSkills: typeof fetchSkills;
  fetchRules: typeof fetchRules;
  fetchRuleItem: typeof fetchRuleItem;
  fetchLanguages: typeof fetchLanguages;
  fetchFeatures: typeof fetchFeatures;
  fetchRaces: typeof fetchRaces;
  fetchRace: typeof fetchRace;
  fetchClass: typeof fetchClass;
  fetchClasses: typeof fetchClasses;
  fetchTraits: typeof fetchTraits;
  fetchArchetypes: typeof fetchArchetypes;
  fetchArmor: typeof fetchArmor;
  fetchWeapon: typeof fetchWeapon;
  fetchEquipment: typeof fetchEquipment;
  fetchMagicItems: typeof fetchMagicItems;
  fetchMagicItem: typeof fetchMagicItem;
  fetchEquipmentItem: typeof fetchEquipmentItem;
  refreshToken: typeof refreshToken;
  fetchCampaigns: typeof fetchCampaigns;
}

export type ICMSClientFetchType = typeof login | typeof fetchSpells | typeof fetchSpell | typeof fetchBeast | typeof fetchDictionaries | typeof fetchDamageTypeEntity | typeof fetchConditions;

export type ICMSClientDictionariesFetchType =
  | typeof fetchDamageTypeEntity
  | typeof fetchConditions
  | typeof fetchAlignments
  | typeof fetchMagicSchools
  | typeof fetchWeaponProperties
  | typeof fetchAbilityScores
  | typeof fetchSkills
  | typeof fetchProficiency
  | typeof fetchFeatures
  | typeof fetchTraits
  | typeof fetchLanguages;

export {
  fetchSpells,
  login,
  fetchSpell,
  fetchBestiary,
  fetchBeast,
  fetchDictionaries,
  fetchDamageTypeEntity,
  fetchConditions,
  fetchAlignments,
  fetchMagicSchools,
  fetchWeaponProperties,
  fetchProficiency,
  fetchAbilityScores,
  fetchSkills,
  fetchRules,
  fetchRuleItem,
  fetchLanguages,
  fetchFeatures,
  fetchRaces,
  fetchRace,
  fetchClasses,
  fetchClass,
  fetchTraits,
  fetchLevels,
  fetchArchetypes,
  fetchArmor,
  fetchWeapon,
  fetchEquipment,
  fetchMagicItems,
  fetchMagicItem,
  fetchEquipmentItem,
  refreshToken,
  fetchCampaigns,
};
