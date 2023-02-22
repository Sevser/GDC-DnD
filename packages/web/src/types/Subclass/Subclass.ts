import { ClassListItemModel, IClassListItemModel } from '../Class/ClassListItemModel';
import { IShortSpell, ShortSpellModel } from '../Spell/Spell';

export interface ISubclassModel {
  index: string;
  name: string;
  subclassFlavor: string;
  desc: string;
  id: number;
  spells: IShortSpell[];
  class: IClassListItemModel;
}

export class SubclassModel implements ISubclassModel {
  index: string;
  name: string;
  subclassFlavor: string;
  desc: string;
  id: number;
  spells: IShortSpell[];
  class: IClassListItemModel;
  constructor(prop: ISubclassModel) {
    this.index = prop.index;
    this.name = prop.name;
    this.subclassFlavor = prop.subclassFlavor;
    this.id = prop.id;
    this.desc = prop.desc;
    this.spells = prop.spells.map((p) => new ShortSpellModel(Object.assign({}, ShortSpellModel.getEmpty(), p)));
    this.class = new ClassListItemModel(Object.assign({}, ClassListItemModel.getEmpty(), prop.class));
  }
  static getEmpty() {
    return new SubclassModel({
      index: '',
      name: '',
      subclassFlavor: '',
      desc: '',
      id: NaN,
      spells: new Array<IShortSpell>(),
      class: ClassListItemModel.getEmpty(),
    });
  }
}
