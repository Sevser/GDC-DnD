import { StrapiUser } from '@/plugins/auth';
import { IFilter } from './Filters';
import { IPagination } from './Pagination';

export interface IGenericStrapiData<Type> {
  attributes: Type;
  id: number;
}

export interface IMeta {
  pagination: IPagination;
  allowedFieldSort: string[];
  canEdit?: boolean;
}

export interface IGenericStrapiMappedData<Type> {
  data: Type[];
  meta: IMeta;
}

export interface IGenericQueryParams<Type> {
  pagination: IPagination;
  sort?: string;
  filters: IFilter;
}

export interface IAuthParams {
  identifier: string;
  password: string;
}

export interface LoginStrapiResponse {
  jwt: string;
  refreshToken: string;
  user: StrapiUser;
}

export interface RefreshTokenStrapiParams {
  refreshToken: string;
}
