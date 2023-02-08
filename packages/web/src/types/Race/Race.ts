export type RaceType = 'Gnome' | 'Dwarf' | 'Dragonborn' | 'Half-orc' | 'Halfing' | 'Half-elf' | 'Tiefling' | 'Human' | 'Elf' | 'None';

export interface IRace {
  Race: RaceType;
}

export class RaceModel implements IRace {
  Race: RaceType;
  constructor(prop: IRace) {
    this.Race = prop.Race;
  }
  static getEmpty() {
    return new RaceModel({
      Race: 'None',
    });
  }
}
