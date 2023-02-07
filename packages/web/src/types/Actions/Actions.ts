export interface IActions {
  name: string;
  desc: string;
  attack_bonus: string;
  usage: any | string;
  dc: any | string;
  actions: any | string;
  damage: any | string;
  options: any | string;
  attacks: any | string;
  action_options: any | string;
}

export class Actions implements IActions {
  name: string;
  desc: string;
  attack_bonus: string;
  usage: any;
  dc: any;
  actions: any;
  damage: any;
  options: any;
  attacks: any;
  action_options: any;
  constructor(prop: IActions) {
    this.name = prop.name;
    this.desc = prop.desc;
    this.attack_bonus = prop.attack_bonus;
    if (typeof prop.usage === 'string') {
      this.usage = JSON.parse(prop.usage);
    } else {
      this.usage = prop.usage;
    }
    if (typeof prop.dc === 'string') {
      this.dc = JSON.parse(prop.dc);
    } else {
      this.dc = prop.dc;
    }
    if (typeof prop.actions === 'string') {
      this.actions = JSON.parse(prop.actions);
    } else {
      this.actions = prop.actions;
    }
    if (typeof prop.damage === 'string') {
      this.damage = JSON.parse(prop.damage);
    } else {
      this.damage = prop.damage;
    }
    if (typeof prop.options === 'string') {
      this.options = JSON.parse(prop.options);
    } else {
      this.options = prop.options;
    }
    if (typeof prop.attacks === 'string') {
      this.attacks = JSON.parse(prop.attacks);
    } else {
      this.attacks = prop.attacks;
    }
    if (typeof prop.action_options === 'string') {
      this.action_options = JSON.parse(prop.action_options);
    } else {
      this.action_options = prop.action_options;
    }
  }
  static getEmpty() {
    return new Actions({
      name: '',
      desc: '',
      attack_bonus: '',
      usage: {},
      action_options: {},
      options: {},
      actions: {},
      attacks: {},
      damage: {},
      dc: {},
    });
  }
}
