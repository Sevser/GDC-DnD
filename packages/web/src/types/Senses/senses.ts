export interface ISenses {
  passive_perception: number;
  darkvision: string;
  blindsight: string;
  truesight: string;
}

export class Senses implements ISenses {
  passive_perception: number;
  darkvision: string;
  blindsight: string;
  truesight: string;
  constructor(prop: ISenses) {
    this.passive_perception = prop.passive_perception;
    this.darkvision = prop.darkvision;
    this.blindsight = prop.blindsight;
    this.truesight = prop.truesight;
  }
  static getEmpty() {
    return new Senses({
      passive_perception: NaN,
      darkvision: '',
      blindsight: '',
      truesight: '',
    });
  }
}
