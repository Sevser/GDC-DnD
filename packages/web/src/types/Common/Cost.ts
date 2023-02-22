export interface ICostModel {
  id: number;
  quantity: number;
  unit: string;
}

export class CostModel implements ICostModel {
  id: number;
  quantity: number;
  unit: string;
  constructor(prop: ICostModel) {
    this.id = prop.id;
    this.quantity = prop.quantity;
    this.unit = prop.unit;
  }
  static getEmpty() {
    return new CostModel({
      id: NaN,
      quantity: NaN,
      unit: '',
    });
  }
}
