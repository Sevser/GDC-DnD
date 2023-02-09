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
    if (prop.abilityScore instanceof AbilityScoreModel && prop.abilityScore !== undefined) {
      this.abilityScore = prop.abilityScore;
    } else if (prop.abilityScore) {
      this.abilityScore = new AbilityScoreModel(prop.abilityScore);
    }
    if (prop.spell instanceof AbilityScoreModel && prop.spell !== undefined) {
      this.spell = prop.spell;
    } else if (prop.spell) {
      this.spell = new Spell(prop.spell);
    }
  }
  static getEmpty() {
    return new SpellSaveDifficultyClassModel({
      desc: '',
      dcSuccess: '',
    });
  }
}
