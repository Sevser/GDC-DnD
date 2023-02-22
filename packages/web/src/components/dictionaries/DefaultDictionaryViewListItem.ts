import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { AllowedDictionaryClasses } from '@/types/Dictionaries/CanBeDictionary';
import { VCard } from 'vuetify/components';

const DefaultDictionaryViewListItem = defineComponent({
  name: 'DefaultDictionaryViewListItem',
  components: {
    VCard,
  },
  props: {
    item: {
      type: Object as PropType<AllowedDictionaryClasses>,
      default: () => ({}),
    },
  },
  render() {
    return h(VCard, {
      id: this.item.index,
      title: this.item.name,
      text: this.item.desc,
      class: {
        'mb-4': true,
      },
    });
  },
});

export default DefaultDictionaryViewListItem;
