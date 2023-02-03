export type BeastAlignment = {
  alignment: string;
  id: number;
};

export type BeastSize = {
  Size: string;
  id: number;
};

export interface IBeastListItem {
  id: number;
  name: string;
  Size: BeastSize;
  alignment: BeastAlignment;
  challenge_rating: number;
  type: string;
}

export class BeastListItem implements IBeastListItem {
  Size: BeastSize;
  id: number;
  alignment: BeastAlignment;
  challenge_rating: number;
  type: string;
  name: string;
  constructor(prop: IBeastListItem) {
    this.Size = prop.Size;
    this.alignment = prop.alignment;
    this.challenge_rating = prop.challenge_rating;
    this.type = prop.type;
    this.name = prop.name;
    this.id = prop.id;
  }
}
