<template>
  <v-btn class="text-body-1 mb-4" variant="flat" @click="() => scrollto()" active>
    {{ section.name }}
  </v-btn>
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
  methods: {
    scrollto() {
      (document as any).querySelector('#' + this.section.index).scrollIntoViewIfNeeded({ behavior: 'smooth' });
    },
  },
});
</script>
