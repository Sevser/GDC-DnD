export type DamageType = 'Acid' | 'Bludgeoning' | 'Cold' | 'Fire' | 'Force' | 'Lightning' | 'Necrotic' | 'Piercing' | 'Poison' | 'Psychic' | 'Radiant' | 'Slashing' | 'Thunder' | 'None';

export interface IDamageTypeModel {
  DamageType: DamageType;
  CustomDamage: string;
}

export class DamageTypeModel implements IDamageTypeModel {
  DamageType: DamageType;
  CustomDamage: string;
  constructor(prop: IDamageTypeModel) {
    this.CustomDamage = prop.CustomDamage;
    this.DamageType = prop.DamageType;
  }
  static getEmpty() {
    return new DamageTypeModel({
      CustomDamage: '',
      DamageType: 'None',
    });
  }
}
