import { BeastModel, IBeastModel } from '@/types/beasts/Beast';
import { BeastListItem, IBeastListItem } from '@/types/beasts/BeastListItem';
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

export interface ICMSClient {
  login: typeof login;
  fetchSpells: typeof fetchSpells;
  fetchSpell: typeof fetchSpell;
  fetchBeast: typeof fetchBeast;
}

export { fetchSpells, login, fetchSpell, fetchBestiary, fetchBeast };
