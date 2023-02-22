<template>
  <v-card class="mx-auto mb-2">
    <v-card-item>
      <div>
        <div class="text-h6 mb-1">
          {{ spell.title }}
        </div>
        <div class="mb-1 d-flex flex-column">
          <div class="d-flex align-baseline">
            <div class="text-body-1 mr-2">Class</div>
            <div class="text-body-2">{{ classes }}</div>
          </div>
        </div>
        <SpellShortInfo :spell="spell" />
      </div>
    </v-card-item>
  </v-card>
</template>
<script lang="ts">
import { ShortSpellModel, Spell } from '@/types/Spell/Spell';
import { ICharacterClass } from '@/types/CharacterClass';
import { defineComponent } from 'vue';
import SpellShortInfo from './SpellShortInfo.vue';

export default defineComponent({
  props: {
    spell: {
      type: ShortSpellModel,
      required: true,
    },
  },
  components: {
    SpellShortInfo,
  },
  computed: {
    schoolOfMagic() {
      return this.spell?.SchoolOfMagic?.SchoolOfMagic || '';
    },
    classes() {
      return this.spell.classes.map((cl) => cl.name).join(', ');
    },
  },
});
</script>
