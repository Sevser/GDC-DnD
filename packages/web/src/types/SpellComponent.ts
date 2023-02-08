export interface ISpellComponent {
  SpellComponent: string;
  id: number;
}

export class SpellComponentModel implements ISpellComponent {
  SpellComponent: string;
  id: number;
  constructor(prop: ISpellComponent) {
    this.SpellComponent = prop.SpellComponent;
    this.id = prop.id;
  }
  static getEmpty() {
    return new SpellComponentModel({
      SpellComponent: '',
      id: NaN,
    });
  }
}
