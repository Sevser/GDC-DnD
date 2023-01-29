export interface IPagination {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}

export class Pagination implements IPagination {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
  constructor(params: IPagination) {
    this.page = params.page;
    this.pageCount = params.pageCount;
    this.pageSize = params.pageSize;
    this.total = params.total;
  }
  get hasNextPage() {
    return this.page < this.pageCount;
  }
  get nextPage(): Partial<IPagination> {
    return {
      page: this.page + 1,
      pageSize: this.pageSize,
    };
  }
  get currentPage(): Partial<IPagination> {
    return {
      page: this.page,
      pageSize: this.pageSize,
    };
  }
  static default() {
    return {
      page: 1,
      pageSize: 25,
    };
  }
}
