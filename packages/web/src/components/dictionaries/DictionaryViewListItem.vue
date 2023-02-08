<script lang="ts">
import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { AllowedDictionaryClasses } from '@/types/Dictionaries/CanBeDictionary';
import { ProficiencyModel } from '@/types/Proficiency/Proficiency';
import ProficiencyViewListItem from './ProficiencyViewListItem.vue';
import { VCard } from 'vuetify/components';

export default defineComponent({
  components: {
    ProficiencyViewListItem,
    VCard,
  },
  props: {
    dictionaryListItem: Object as PropType<AllowedDictionaryClasses>,
  },
  computed: {
    isProficiency() {
      return this.dictionaryListItem instanceof ProficiencyModel;
    },
  },
  render() {
    if (this.isProficiency) {
      return h(ProficiencyViewListItem, {
        item: this.dictionaryListItem as ProficiencyModel,
      });
    }
    return h(VCard, {
      title: this.dictionaryListItem?.name,
      text: this.dictionaryListItem?.desc,
      class: {
        'mb-4': true,
      },
    });
  },
});
</script>
