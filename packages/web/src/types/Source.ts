export interface ISource {
  id: number;
  source: string;
}

export class Source implements ISource {
  id: number;
  source: string;
  constructor(source: ISource) {
    this.id = source.id;
    this.source = source.source;
  }
}
