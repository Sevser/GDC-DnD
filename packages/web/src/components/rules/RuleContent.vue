<template>
  <v-card class="mb-4">
    <v-card-item>
      <v-card-title :id="section.index">{{ section.name }}</v-card-title>
    </v-card-item>

    <v-card-text>
      {{ section.desc }}
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { RuleSectionModel } from '@/types/RuleSection/RuleSection';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    section: {
      type: RuleSectionModel,
      required: true,
      default: () => RuleSectionModel.getEmpty(),
    },
  },
});
</script>
