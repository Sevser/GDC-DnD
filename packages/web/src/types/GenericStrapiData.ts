import { IPagination } from './Paginstion';

export interface IGenericStrapiData<Type> {
  attributes: Type;
  id: number;
}

export interface IMeta {
  pagination: IPagination;
}

export interface IGenericStrapiMappedData<Type> {
  data: Type[];
  meta: IMeta;
}

export type IQuerySortParams<Type extends string> = Type | `${Type}:asc` | `${Type}:desc`;

export interface IGenericQueryParams<Type> {
  pagination: IPagination;
}
