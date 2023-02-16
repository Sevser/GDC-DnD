export interface ISpeedModel {
  walk: string;
  swim: string;
  fly: string;
}

export class SpeedModel implements ISpeedModel {
  walk: string;
  swim: string;
  fly: string;
  constructor(prop: ISpeedModel) {
    this.walk = prop.walk;
    this.fly = prop.fly;
    this.swim = prop.swim;
  }
  static getEmpty() {
    return new SpeedModel({
      walk: '',
      swim: '',
      fly: '',
    });
  }
}
