import { defineComponent, h, PropType } from 'vue';
import { TraitDictionaryItem } from '@/types/Trait/TraitDictionaryItem';
import { VCard, VCol, VRow } from 'vuetify/components';
import { RouterLink } from 'vue-router';
import { DictionaryTypePropName } from '@/types/constants';
import { ProficiencyModel } from '@/types/Proficiency/Proficiency';

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<TraitDictionaryItem>,
      default: () => TraitDictionaryItem.getEmpty(),
    },
  },
  computed: {
    title() {
      return this.item.name;
    },
    description() {
      return this.item.desc;
    },
    proficiencies() {
      return this.item.proficiencies.map((prof) => prof.name).join(', ');
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
                                default: () => 'Proficiencies',
                              }
                            ),
                            h(
                              RouterLink,
                              {
                                to: { name: 'DictionaryView', params: { id: ProficiencyModel.getEmpty()[DictionaryTypePropName] } },
                              },
                              [this.proficiencies]
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
