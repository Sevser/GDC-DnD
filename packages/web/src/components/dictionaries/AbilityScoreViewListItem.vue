<template>
  <v-card :title="title" class="mb-4">
    <template #text>
      <v-row>
        <v-col cols="10">
          {{ description }}
        </v-col>
        <v-col cols="2">
          <div class="d-flex flex-column mr-4">
            <div class="text-subtitle-2 mr-2">Skills</div>
            <router-link :to="{ name: 'DictionaryView', params: { id: 'skills' } }">{{ skills }}</router-link>
          </div>
        </v-col>
      </v-row>
    </template>
  </v-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { AbilityScoreModel } from '@/types/AbilityScore/AbilityScore';

export default defineComponent({
  props: {
    item: Object as PropType<AbilityScoreModel>,
  },
  computed: {
    title() {
      if (this.item) {
        return this.item.fullName;
      }
      return '';
    },
    description() {
      if (this.item) {
        return this.item.desc;
      }
      return '';
    },
    skills() {
      if (this.item && this.item.skills && this.item.skills.length) {
        return this.item.skills.map((skill) => skill.name).join(', ');
      }
      return 'None Skills';
    },
  },
});
</script>
