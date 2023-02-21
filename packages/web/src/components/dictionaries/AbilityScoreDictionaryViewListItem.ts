import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { AbilityScoreModel } from '@/types/AbilityScore/AbilityScore';
import { VCard, VCol, VRow } from 'vuetify/components';
import { RouterLink } from 'vue-router';

export default defineComponent({
  name: 'AbilityScoreDictionaryViewListItem',
  props: {
    item: Object as PropType<AbilityScoreModel>,
  },
  computed: {
    title() {
      if (this.item) {
        return this.item.fullName;
      }
      return '';
    },
    description() {
      if (this.item) {
        return this.item.desc;
      }
      return '';
    },
    skills() {
      if (this.item && this.item.skills && this.item.skills.length) {
        return this.item.skills.map((skill) => skill.name).join(', ');
      }
      return 'None Skills';
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
                                to: { name: 'DictionaryView', params: { id: 'skills' } },
                              },
                              {
                                default: () => this.skills,
                              }
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
