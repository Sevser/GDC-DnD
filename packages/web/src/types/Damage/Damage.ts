export interface IDamageModel {
  id: number;
  damageDice: string;
}

export class DamageModel implements IDamageModel {
  id: number;
  damageDice: string;
  constructor(prop: IDamageModel) {
    this.id = prop.id;
    this.damageDice = prop.damageDice;
  }
  static getEmpty() {
    return new DamageModel({
      id: NaN,
      damageDice: '',
    });
  }
}
