export interface ISpeed {
  walk: string;
  swim: string;
  fly: string;
}

export class Speed implements ISpeed {
  walk: string;
  swim: string;
  fly: string;
  constructor(prop: ISpeed) {
    this.walk = prop.walk;
    this.fly = prop.fly;
    this.swim = prop.swim;
  }
  static getEmpty() {
    return new Speed({
      walk: '',
      swim: '',
      fly: '',
    });
  }
}
