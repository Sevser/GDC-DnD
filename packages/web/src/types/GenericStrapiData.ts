import { IPagination } from './Pagination';

export interface IGenericStrapiData<Type> {
  attributes: Type;
  id: number;
}

export interface IMeta {
  pagination: IPagination;
  allowedFieldSort: string[];
}

export interface IGenericStrapiMappedData<Type> {
  data: Type[];
  meta: IMeta;
}

export interface IGenericQueryParams<Type> {
  pagination: IPagination;
  sort?: string;
}
