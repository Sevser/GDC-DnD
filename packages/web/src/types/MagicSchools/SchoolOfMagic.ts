export type SchoolOfMagicType = 'Conjuration' | 'Necromancy' | 'Evocation' | 'Abjuration' | 'Transmutation' | 'Divination' | 'Enchantment' | 'Illusion' | 'None';
export interface ISchoolOfMagic {
  SchoolOfMagic: SchoolOfMagicType;
  id: number;
}

export class SchoolOfMagicModel implements ISchoolOfMagic {
  SchoolOfMagic: SchoolOfMagicType;
  id: number;
  constructor(prop: ISchoolOfMagic) {
    this.SchoolOfMagic = prop.SchoolOfMagic;
    this.id = prop.id;
  }
  static getEmpty() {
    return new SchoolOfMagicModel({
      SchoolOfMagic: 'None',
      id: NaN,
    });
  }
}
