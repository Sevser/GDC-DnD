import { IRuleSection, RuleSectionModel } from '../RuleSection/RuleSection';

export interface IRuleListItem {
  id: number;
  index: string;
  name: string;
}

export class RuleListItem implements IRuleListItem {
  id: number;
  index: string;
  name: string;
  constructor(prop: IRuleListItem) {
    this.id = prop.id;
    this.index = prop.index;
    this.name = prop.name;
  }
  static getEmpty() {
    return new RuleListItem({
      id: NaN,
      index: '',
      name: '',
    });
  }
}

export interface IRuleViewItem {
  ruleSections: IRuleSection[];
}

export class RuleViewItemModel implements IRuleListItem, IRuleViewItem {
  id: number;
  index: string;
  name: string;
  ruleSections: IRuleSection[];
  constructor(prop: IRuleViewItem & IRuleListItem) {
    this.id = prop.id;
    this.index = prop.index;
    this.name = prop.name;
    this.ruleSections = prop.ruleSections.map((rule) => {
      if (rule instanceof RuleSectionModel) {
        return rule;
      }
      return new RuleSectionModel(rule);
    });
  }
  static getEmpty() {
    return new RuleViewItemModel({
      id: NaN,
      index: '',
      name: '',
      ruleSections: new Array<IRuleSection>(),
    });
  }
}
