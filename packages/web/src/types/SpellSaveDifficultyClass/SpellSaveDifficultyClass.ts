import { AbilityScoreModel, IAbilityScore } from '../AbilityScore/AbilityScore';
import { ISpell, Spell } from '../Spell/Spell';

export interface ISpellSaveDifficultyClass {
  desc: string;
  dcSuccess: string;
  abilityScore?: IAbilityScore;
  spell?: ISpell;
}

export class SpellSaveDifficultyClassModel implements ISpellSaveDifficultyClass {
  desc: string;
  dcSuccess: string;
  abilityScore?: IAbilityScore;
  spell?: ISpell;
  constructor(prop: ISpellSaveDifficultyClass) {
    this.dcSuccess = prop.dcSuccess;
    this.desc = prop.desc;
    if (prop.abilityScore) {
      this.abilityScore = new AbilityScoreModel(Object.assign({}, AbilityScoreModel.getEmpty(), prop.abilityScore));
    }
    if (prop.spell) {
      this.spell = new Spell(Object.assign({}, Spell.getEmpty(), prop.spell));
    }
  }
  static getEmpty() {
    return new SpellSaveDifficultyClassModel({
      desc: '',
      dcSuccess: '',
    });
  }
}
