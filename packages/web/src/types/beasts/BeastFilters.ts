import { BeastChallengeRating } from './BeastChallengeRating';
import { BeastSize } from './BeastSize';
import { BeastType } from './BeastType';

export interface IBeastFilter {
  size?: BeastSize;
  type?: BeastType;
  challengeRating?: BeastChallengeRating;
}

export class BeastFilter implements IBeastFilter {
  size?: BeastSize;
  type?: BeastType;
  challengeRating?: BeastChallengeRating;
  constructor(prop: IBeastFilter) {
    this.size = prop.size;
    this.type = prop.type;
    this.challengeRating = prop.challengeRating;
  }
  get forParams() {
    const filters: any = {};
    if (this.size) {
      filters.Size = {
        Size: {
          $in: this.size,
        },
      };
    }
    if (this.type) {
      filters.type = {
        $eq: this.type,
      };
    }
    if (this.challengeRating !== undefined) {
      filters.challenge_rating = {
        $eq: this.challengeRating,
      };
    }
    return filters;
  }
}
