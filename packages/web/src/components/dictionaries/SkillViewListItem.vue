<template>
  <v-card :title="title" class="mb-4">
    <template #text>
      <v-row>
        <v-col cols="10">
          {{ description }}
        </v-col>
        <v-col cols="2">
          <div class="d-flex flex-column mr-4">
            <div class="text-subtitle-2 mr-2">Ability</div>
            <router-link :to="{ name: 'DictionaryView', params: { id: 'ability-score' } }">{{ ability }}</router-link>
          </div>
        </v-col>
      </v-row>
    </template>
  </v-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { SkillModel } from '@/types/Skills/Skills';

export default defineComponent({
  props: {
    item: Object as PropType<SkillModel>,
  },
  computed: {
    title() {
      if (this.item) {
        return this.item.name;
      }
      return '';
    },
    description() {
      if (this.item) {
        return this.item.desc;
      }
      return '';
    },
    ability() {
      if (this.item && this.item.ability) {
        return this.item.ability.fullName;
      }
      return 'No abilities';
    },
  },
});
</script>
