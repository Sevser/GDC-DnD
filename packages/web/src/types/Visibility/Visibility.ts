export class Visibility {
  gameMaster: boolean;
  player: boolean;
  constructor(props: Partial<Visibility>) {
    this.gameMaster = props?.gameMaster || false;
    this.player = props?.player || false;
  }
  static getEmpty() {
    return new Visibility({
      gameMaster: false,
      player: false,
    });
  }
}
