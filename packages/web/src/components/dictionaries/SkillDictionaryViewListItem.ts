import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { VCard, VCol, VRow } from 'vuetify/components';
import { RouterLink } from 'vue-router';
import { SkillModel } from '@/types/Skills/Skills';

export default defineComponent({
  name: 'SkillDictionaryViewListItem',
  props: {
    item: {
      type: Object as PropType<SkillModel>,
      default: () => SkillModel.getEmpty(),
    },
  },
  computed: {
    title() {
      if (this.item) {
        return this.item.name;
      }
      return '';
    },
    description() {
      if (this.item) {
        return this.item.desc;
      }
      return '';
    },
    ability() {
      if (this.item && this.item.ability) {
        return this.item.ability.fullName;
      }
      return 'No abilities';
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
            VRow,
            {},
            {
              default: () => [
                h(
                  VCol,
                  {
                    cols: 10,
                  },
                  {
                    default: () => this.description,
                  }
                ),
                h(
                  VCol,
                  {
                    cols: 2,
                  },
                  {
                    default: () =>
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
                                default: () => 'Skills',
                              }
                            ),
                            h(
                              RouterLink,
                              {
                                to: { name: 'DictionaryView', params: { id: 'ability-score' } },
                              },
                              [this.ability]
                            ),
                          ],
                        }
                      ),
                  }
                ),
              ],
            }
          ),
      }
    );
  },
});
