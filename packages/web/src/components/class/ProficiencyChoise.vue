<template>
  <v-expansion-panel :title="proficiencyChoise.desc">
    <template #text>
      <v-chip v-for="st in proficiencyChoise.proficiencies" :key="st.name" class="mr-2 mb-1">
        {{ st.name }}
      </v-chip>
    </template>
  </v-expansion-panel>
</template>
<script lang="ts">
import { ProficiencyChoiseModel } from '@/types/Proficiency/ProficiencyChoise';
import { defineComponent, PropType } from 'vue';
export default defineComponent({
  props: {
    proficiencyChoise: {
      type: Object as PropType<ProficiencyChoiseModel>,
      default: () => ProficiencyChoiseModel.getEmpty(),
    },
  },
});
</script>
