export interface IGenericStrapiData<Type> {
  attributes: Type;
  id: number;
}

export interface IPagination {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}

export interface IMeta {
  pagination: IPagination;
}

export interface IGenericStrapiMappedData<Type> {
  data: Type[];
  meta: IMeta;
}
