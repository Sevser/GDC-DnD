export interface IBeastFilter {
  size?: string;
  type?: BeastType;
  challengeRating?: BeastChallengeRating;
}

export type BeastType =
  | 'aberration'
  | 'humanoid'
  | 'dragon'
  | 'elemental'
  | 'monstrosity'
  | 'construct'
  | 'beast'
  | 'plant'
  | 'fiend'
  | 'ooze'
  | 'fey'
  | 'giant'
  | 'celestial'
  | 'undead'
  | 'swarm of Tiny beasts';

export type BeastChallengeRating = 10 | 0.25 | 14 | 16 | 13 | 15 | 17 | 5 | 21 | 23 | 20 | 22 | 24 | 1 | 2 | 0.5 | 12 | 8 | 0 | 19 | 0.125 | 3 | 11 | 4 | 6 | 9 | 7 | 30;

export class BeastFilter implements IBeastFilter {
  size?: string;
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
