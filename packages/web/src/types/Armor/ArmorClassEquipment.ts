export interface IArmorClassEquipment {
  base: number;
  dexBonus: number;
  id: number;
  maxBonus: number;
}

export class ArmorClassEquipment implements IArmorClassEquipment {
  base: number;
  dexBonus: number;
  id: number;
  maxBonus: number;
  constructor(prop: IArmorClassEquipment) {
    this.id = prop.id;
    this.base = prop.base;
    this.maxBonus = prop.maxBonus;
    this.dexBonus = prop.dexBonus;
  }
  static getEmpty() {
    return new ArmorClassEquipment({
      id: NaN,
      base: NaN,
      maxBonus: NaN,
      dexBonus: NaN,
    });
  }
}
