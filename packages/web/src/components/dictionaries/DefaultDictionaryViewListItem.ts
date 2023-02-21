import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { AllowedDictionaryClasses } from '@/types/Dictionaries/CanBeDictionary';
import { VCard } from 'vuetify/components';

export default defineComponent({
  name: 'DefaultDictionaryViewListItem',
  components: {
    VCard,
  },
  props: {
    item: Object as PropType<AllowedDictionaryClasses>,
  },
  render() {
    return h(VCard, {
      title: this.item?.name,
      text: this.item?.desc,
      class: {
        'mb-4': true,
      },
    });
  },
});
