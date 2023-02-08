<template>
  <v-card :title="title" class="mb-4">
    <template #text>
      <div class="d-flex">
        <div class="d-flex flex-column mr-4">
          <div class="text-subtitle-2 mr-2">Classes</div>
          <div>{{ classes }}</div>
        </div>

        <div class="d-flex flex-column">
          <div class="text-subtitle-2 mr-2">Races</div>
          <div>{{ races }}</div>
        </div>
      </div>
    </template>
  </v-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { ProficiencyModel } from '@/types/Proficiency/Proficiency';

export default defineComponent({
  props: {
    item: Object as PropType<ProficiencyModel>,
  },
  computed: {
    title() {
      if (this.item) {
        return `${this.item.name}  ${this.item.type}`;
      }
      return '';
    },
    classes() {
      if (this.item && this.item.classes && this.item.classes.length) {
        return this.item.classes.map((cl) => cl.class).join(', ');
      }
      return 'All classes';
    },
    races() {
      if (this.item && this.item.races && this.item.races.length) {
        return this.item.races.map((rc) => rc.Race).join(', ');
      }
      return 'All races';
    },
  },
});
</script>
