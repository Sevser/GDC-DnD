export interface IArmorClass {
  type: string;
  value: number;
}

export class ArmorClass implements IArmorClass {
  type: string;
  value: number;
  constructor(prop: IArmorClass) {
    this.value = prop.value;
    this.type = prop.type;
  }
}
