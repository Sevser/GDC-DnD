<template>
  <v-card :title="title" class="mb-4">
    <template #text>
      <div class="d-flex">
        <div class="d-flex flex-column mr-4">
          <div class="text-subtitle-2 mr-2">Classes</div>
          <div>
            <router-link v-for="cl in classes" :key="cl.index" class="mr-2 mb-1" :to="{ name: 'ClassView', params: { id: cl.id } }"> {{ cl.name }}</router-link>
          </div>
        </div>

        <div class="d-flex flex-column">
          <div class="text-subtitle-2 mr-2">Races</div>
          <div>
            <router-link v-for="rc in races" :key="rc.index" class="mr-2 mb-1" :to="{ name: 'RaceView', params: { id: rc.id } }"> {{ rc.name }}</router-link>
          </div>
        </div>
      </div>
    </template>
  </v-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { ICharacterClass } from '@/types/CharacterClass.ts';
import { IRace } from '@/types/Race/RaceListItem';
import { TraitDictionaryItem } from '@/types/Trait/TraitDictionaryItem';

export default defineComponent({
  props: {
    item: Object as PropType<TraitDictionaryItem>,
  },
  computed: {
    title() {
      if (this.item) {
        return `${this.item.name}  ${this.item.type}`;
      }
      return '';
    },
    classes() {
      return (this.item && this.item.classes) || new Array<ICharacterClass>();
    },
    races() {
      return (this.item && this.item.races) || new Array<IRace>();
    },
  },
});
</script>
