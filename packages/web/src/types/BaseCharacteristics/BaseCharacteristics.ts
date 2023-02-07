export interface IBaseCharacteristics {
  Strength: number;
  Dexterity: number;
  Constitution: number;
  Intelligence: number;
  Wisdom: number;
  Charisma: number;
  CharismaMaster: boolean;
  WisdomMaster: boolean;
  IntelligenceMaster: boolean;
  ConstitutionMaster: boolean;
  DexterityMaster: boolean;
  StrengthMaster: boolean;
}

export class BaseCharacteristics implements IBaseCharacteristics {
  Strength: number;
  Dexterity: number;
  Constitution: number;
  Intelligence: number;
  Wisdom: number;
  Charisma: number;
  CharismaMaster: boolean;
  WisdomMaster: boolean;
  IntelligenceMaster: boolean;
  ConstitutionMaster: boolean;
  DexterityMaster: boolean;
  StrengthMaster: boolean;
  constructor(prop: IBaseCharacteristics) {
    this.Strength = prop.Strength;
    this.StrengthMaster = prop.StrengthMaster;
    this.Dexterity = prop.Dexterity;
    this.DexterityMaster = prop.DexterityMaster;
    this.Intelligence = prop.Intelligence;
    this.IntelligenceMaster = prop.IntelligenceMaster;
    this.Constitution = prop.Constitution;
    this.ConstitutionMaster = prop.ConstitutionMaster;
    this.Charisma = prop.Charisma;
    this.CharismaMaster = prop.CharismaMaster;
    this.Wisdom = prop.Wisdom;
    this.WisdomMaster = prop.WisdomMaster;
  }
  static getEmpty() {
    return new BaseCharacteristics({
      Strength: 0,
      Dexterity: 0,
      Constitution: 0,
      Intelligence: 0,
      Wisdom: 0,
      Charisma: 0,
      CharismaMaster: false,
      WisdomMaster: false,
      IntelligenceMaster: false,
      ConstitutionMaster: false,
      DexterityMaster: false,
      StrengthMaster: false,
    });
  }
  toText(num: number) {
    const modificator: number = Math.floor(num / 2) - 5;
    return `${num} (${modificator > 0 ? '+' + modificator : modificator})`;
  }
}
