export interface IRangeModel {
  id: number;
  normal: number;
  long: number;
}

export class RangeModel implements IRangeModel {
  id: number;
  normal: number;
  long: number;
  constructor(prop: IRangeModel) {
    this.id = prop.id;
    this.normal = prop.normal;
    this.long = prop.long;
  }
  static getEmpty() {
    return new RangeModel({
      id: NaN,
      normal: NaN,
      long: NaN,
    });
  }
}
