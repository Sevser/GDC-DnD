import { cmsClient } from '@/plugins/http';
import { ICanBeDictionary } from '../Dictionaries/CanBeDictionary';

export interface IAlignment {
  index: string;
  name: string;
  abbriviation: string;
  desc: string;
}

export class AlignmentModel implements IAlignment, ICanBeDictionary {
  index: string;
  name: string;
  abbriviation: string;
  desc: string;
  type: string;
  constructor(prop: IAlignment) {
    this.index = prop.index;
    this.name = prop.name;
    this.abbriviation = prop.abbriviation;
    this.desc = prop.desc;
    this.type = 'alignments';
  }
  getCmsProvider() {
    return cmsClient.fetchAlignments;
  }
  static getEmpty() {
    return new AlignmentModel({
      index: '',
      name: '',
      abbriviation: '',
      desc: '',
    });
  }
}
