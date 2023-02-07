export type BeastSize = 'Large' | 'Medium' | 'Huge' | 'Gargantuan' | 'Small' | 'Tiny';

export interface IBeastSizeModel {
  Size: BeastSize;
  id: number;
}

export class BeastSizeModel implements IBeastSizeModel {
  Size: BeastSize;
  id: number;
  constructor(prop: IBeastSizeModel) {
    this.Size = prop.Size;
    this.id = prop.id;
  }
  static getEmpty() {
    return new BeastSizeModel({
      Size: 'Large',
      id: NaN,
    });
  }
}
