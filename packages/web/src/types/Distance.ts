export interface IDistance {
  distanceShort: string;
  longText: string;
  id?: number;
}

export class Distance implements IDistance {
  longText: string;
  distanceShort: string;
  id?: number;
  constructor(prop: IDistance) {
    this.distanceShort = prop.distanceShort;
    this.longText = prop.longText;
    this.id = prop.id;
  }
  static getEmpty() {
    return new Distance({
      distanceShort: '',
      longText: '',
    });
  }
}
