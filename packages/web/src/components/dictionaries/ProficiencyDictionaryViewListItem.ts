import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { ProficiencyModel } from '@/types/Proficiency/Proficiency';
import { ICharacterClass } from '@/types/CharacterClass';
import { VCard } from 'vuetify/components';
import { RouterLink } from 'vue-router';

export default defineComponent({
  name: 'ProficiencyDictionaryViewListItem',
  props: {
    item: {
      type: Object as PropType<ProficiencyModel>,
      default: () => ProficiencyModel.getEmpty(),
    },
  },
  computed: {
    title() {
      if (this.item) {
        return `${this.item.name}  ${this.item.type}`;
      }
      return '';
    },
    classes() {
      return (this.item && this.item.classes) || new Array<ICharacterClass>();
    },
    races() {
      if (this.item && this.item.races && this.item.races.length) {
        return this.item.races.map((rc) => rc.Race).join(', ');
      }
      return 'All races';
    },
  },
  render() {
    return h(
      VCard,
      {
        title: this.title,
        class: {
          'mb-4': true,
        },
      },
      {
        text: () =>
          h(
            'div',
            {
              class: {
                'd-flex': true,
              },
            },
            {
              default: () => [
                h(
                  'div',
                  {
                    class: {
                      'd-flex': true,
                      'flex-column': true,
                      'mr-4': true,
                    },
                  },
                  {
                    default: () => [
                      h(
                        'div',
                        {
                          class: {
                            'text-subtitle-2': true,
                            'mr-2': true,
                          },
                        },
                        {
                          default: () => 'Classes',
                        }
                      ),
                      h(
                        'div',
                        {},
                        {
                          default: () =>
                            this.classes.map((cl) =>
                              h(
                                RouterLink,
                                {
                                  to: { name: 'ClassView', params: { id: cl.id } },
                                  class: {
                                    'mr-2': true,
                                    'mb-1': true,
                                  },
                                },
                                {
                                  default: () => cl.name,
                                }
                              )
                            ),
                        }
                      ),
                    ],
                  }
                ),
                h(
                  'div',
                  {
                    class: {
                      'd-flex': true,
                      'flex-column': true,
                      'mr-2': true,
                    },
                  },
                  {
                    default: () => [
                      h(
                        'div',
                        {
                          class: {
                            'text-subtitle-2': true,
                            'mr-2': true,
                          },
                        },
                        {
                          default: () => 'Races',
                        }
                      ),
                      h(
                        'div',
                        {},
                        {
                          default: () => this.races,
                        }
                      ),
                    ],
                  }
                ),
              ],
            }
          ),
      }
    );
  },
});
