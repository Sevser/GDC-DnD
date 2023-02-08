import { BeastModel, IBeastModel } from '@/types/beasts/Beast';
import { BeastListItem, IBeastListItem } from '@/types/beasts/BeastListItem';
import { ConditionModel, IConditionModel } from '@/types/Condition/Condition';
import { DamageTypeEntityModel, IDamageTypeEntityModel } from '@/types/DamageType/DamageTypeEntity';
import { DictionaryModel, IDictionary } from '@/types/Dictionaries/Dictionary';
import { IAuthParams, IGenericQueryParams, IGenericStrapiData, IGenericStrapiMappedData } from '@/types/GenericStrapiData';
import { Spell } from '@/types/Spell';
import baseClient from './baseClient';

const cmsUrl = import.meta.env.VITE_APP_CMS_HOST;

const login = async (params: IAuthParams): Promise<boolean> => {
  try {
    const result = await baseClient.post(`${cmsUrl}/api/auth/local`, params);
    baseClient.defaults.headers.Authorization = `Bearer ${result.data.jwt}`;
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const fetchSpells = async (params: IGenericQueryParams<Spell>): Promise<IGenericStrapiMappedData<Spell>> => {
  const result = await baseClient.get(`${cmsUrl}/api/spells`, {
    params,
  });
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<Spell>) => new Spell({ ...item.attributes, id: item.id })),
  };
};

const fetchSpell = async (spellId: string | number): Promise<Spell> => {
  const result = await baseClient.get(`${cmsUrl}/api/spells/${spellId}`);
  return new Spell({ ...result.data.data.attributes, id: result.data.data.id });
};

const fetchBestiary = async (params: IGenericQueryParams<IBeastListItem>): Promise<IGenericStrapiMappedData<IBeastListItem>> => {
  const result = await baseClient.get(`${cmsUrl}/api/beasts`, {
    params,
  });
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<IBeastListItem>) => new BeastListItem({ ...item.attributes, id: item.id })),
  };
};

const fetchBeast = async (beastId: string | number): Promise<IBeastModel> => {
  const result = await baseClient.get(`${cmsUrl}/api/beasts/${beastId}`);
  return new BeastModel({
    id: result.data.data.id,
    ...result.data.data.attributes,
  });
};

const fetchDictionaries = async (): Promise<IGenericStrapiMappedData<IDictionary>> => {
  const result = await baseClient.get(`${cmsUrl}/api/dictionaries`);
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<IDictionary>) => new DictionaryModel({ ...item.attributes, id: item.id })),
  };
};

const fetchDamageTypeEntity = async (): Promise<IGenericStrapiMappedData<IDamageTypeEntityModel>> => {
  const result = await baseClient.get(`${cmsUrl}/api/damage-type-entitys`);
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<IDamageTypeEntityModel>) => new DamageTypeEntityModel({ ...item.attributes })),
  };
};

const fetchConditions = async (): Promise<IGenericStrapiMappedData<IConditionModel>> => {
  const result = await baseClient.get(`${cmsUrl}/api/conditions`);
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<IConditionModel>) => new ConditionModel({ ...item.attributes })),
  };
};

export interface ICMSClient {
  login: typeof login;
  fetchSpells: typeof fetchSpells;
  fetchSpell: typeof fetchSpell;
  fetchBeast: typeof fetchBeast;
  fetchDictionaries: typeof fetchDictionaries;
  fetchDamageTypeEntity: typeof fetchDamageTypeEntity;
  fetchConditions: typeof fetchConditions;
}

export type ICMSClientFetchType = typeof login | typeof fetchSpells | typeof fetchSpell | typeof fetchBeast | typeof fetchDictionaries | typeof fetchDamageTypeEntity | typeof fetchConditions;

export type ICMSClientDictionariesFetchType = typeof fetchDamageTypeEntity | typeof fetchConditions;

export { fetchSpells, login, fetchSpell, fetchBestiary, fetchBeast, fetchDictionaries, fetchDamageTypeEntity, fetchConditions };
