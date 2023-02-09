<script lang="ts">
import { defineComponent, h } from 'vue';
import type { PropType } from 'vue';
import { AllowedDictionaryClasses } from '@/types/Dictionaries/CanBeDictionary';
import { ProficiencyModel } from '@/types/Proficiency/Proficiency';
import ProficiencyViewListItem from './ProficiencyViewListItem.vue';
import AbilityScoreViewListItem from './AbilityScoreViewListItem.vue';
import { VCard } from 'vuetify/components';
import { AbilityScoreModel } from '@/types/AbilityScore/AbilityScore';
import { SkillModel } from '@/types/Skills/Skills';
import SkillViewListItem from './SkillViewListItem.vue';

export default defineComponent({
  components: {
    ProficiencyViewListItem,
    AbilityScoreViewListItem,
    SkillViewListItem,
    VCard,
  },
  props: {
    dictionaryListItem: Object as PropType<AllowedDictionaryClasses>,
  },
  computed: {
    isProficiency() {
      return this.dictionaryListItem instanceof ProficiencyModel;
    },
    isAbilityScore() {
      return this.dictionaryListItem instanceof AbilityScoreModel;
    },
    isSkill() {
      return this.dictionaryListItem instanceof SkillModel;
    },
  },
  render() {
    if (this.isProficiency) {
      return h(ProficiencyViewListItem, {
        item: this.dictionaryListItem as ProficiencyModel,
      });
    }
    if (this.isAbilityScore) {
      return h(AbilityScoreViewListItem, {
        item: this.dictionaryListItem as AbilityScoreModel,
      });
    }
    if (this.isSkill) {
      return h(SkillViewListItem, {
        item: this.dictionaryListItem as SkillModel,
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
