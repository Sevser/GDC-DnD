export interface ISpell {
  title: string;
  description: string;
  HighterLevelDescription: string;
  Level: number;
  Concentration: boolean;
  actionTypeDescription: string;
  activeTime: string;
  id: number;
}

export class Spell implements ISpell {
  constructor(prop: ISpell) {
    this.title = prop.title;
    this.description = prop.description;
    this.HighterLevelDescription = prop.HighterLevelDescription;
    this.Level = prop.Level;
    this.Concentration = prop.Concentration;
    this.actionTypeDescription = prop.actionTypeDescription;
    this.activeTime = prop.activeTime;
    this.description = prop.description;
    this.id = prop.id;
  }
  id: number;
  title: string;
  description: string;
  HighterLevelDescription: string;
  Level: number;
  Concentration: boolean;
  actionTypeDescription: string;
  activeTime: string;
}
