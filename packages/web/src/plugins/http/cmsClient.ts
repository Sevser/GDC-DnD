import { IGenericQueryParams, IGenericStrapiData, IGenericStrapiMappedData } from '@/types/GenericStrapiData';
import { Spell } from '@/types/Spell';
import baseClient from './baseClient';

const cmsUrl = import.meta.env.VITE_APP_CMS_HOST;

const fetchSpells = async (params: IGenericQueryParams<Spell>): Promise<IGenericStrapiMappedData<Spell>> => {
  const result = await baseClient.get(`${cmsUrl}/api/spells`, {
    params,
  });
  return {
    meta: result.data.meta,
    data: result.data.data.map((item: IGenericStrapiData<Spell>) => new Spell({ ...item.attributes, id: item.id })),
  };
};

export { fetchSpells };