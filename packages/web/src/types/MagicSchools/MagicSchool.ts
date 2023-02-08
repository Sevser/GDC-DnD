import { cmsClient } from '@/plugins/http';
import { ICanBeDictionary } from '../Dictionaries/CanBeDictionary';

export interface IMagicSchool {
  index: string;
  name: string;
  desc: string;
}

export class MagicSchoolModel implements IMagicSchool, ICanBeDictionary {
  type: string;
  index: string;
  name: string;
  desc: string;
  constructor(prop: IMagicSchool) {
    this.type = 'magic-schools';
    this.index = prop.index;
    this.name = prop.name;
    this.desc = prop.desc;
  }
  getCmsProvider() {
    return cmsClient.fetchMagicSchools;
  }
  static getEmpty() {
    return new MagicSchoolModel({
      index: '',
      name: '',
      desc: '',
    });
  }
}
