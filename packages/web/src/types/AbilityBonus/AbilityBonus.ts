import { IAbilityScore, AbilityScoreModel } from '../AbilityScore/AbilityScore';

export interface IAbilityBonus {
  bonus: number;
  abilityScore: IAbilityScore;
  id: number;
}

export class AbilityBonusModel implements IAbilityBonus {
  bonus: number;
  abilityScore: IAbilityScore;
  id: number;
  constructor(props: IAbilityBonus) {
    this.bonus = props.bonus;
    this.id = props.id;
    this.abilityScore = props.abilityScore;
  }
  static getEmpty() {
    return new AbilityBonusModel({
      bonus: NaN,
      id: NaN,
      abilityScore: AbilityScoreModel.getEmpty(),
    });
  }
}
