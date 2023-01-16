export type SortDirection = 'asc' | 'desc';

export interface ISorting {
  fieldName: string;
  direction: SortDirection;
}

export class Sorting implements ISorting {
  direction: SortDirection;
  fieldName: string;
  constructor(sorting: ISorting | string) {
    if (typeof sorting === 'string') {
      this.direction = 'asc';
      this.fieldName = sorting;
    } else {
      this.direction = sorting.direction;
      this.fieldName = sorting.fieldName;
    }
  }
  get forParams() {
    return {
      sort: `${this.fieldName}:${this.direction}`,
    };
  }
}
