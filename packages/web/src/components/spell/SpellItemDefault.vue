<template>
  <v-card class="mx-auto mb-2" @click="toggle(!collapsed)">
    <v-card-item>
      <div>
        <div class="text-h6 mb-1">
          {{ spell.title }}
        </div>
        <div class="mb-1 d-flex flex-column">
          <div class="d-flex align-baseline">
            <div class="text-body-1 mr-2">School</div>
            <div class="text-body-2">{{ schoolOfMagic }}</div>
          </div>
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
import { ShortSpellModel } from '@/types/Spell/Spell';
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
  data: () => ({
    collapsed: false,
    showCollapse: false,
  }),
  methods: {
    toggle(e: boolean) {
      this.collapsed = e;
    },
  },
  computed: {
    schoolOfMagic() {
      return '';
    },
    classes() {
      return this.spell.classes.map((item: ICharacterClass) => item.name).join(', ') || '';
    },
    lines() {
      return this.collapsed ? undefined : 'two';
    },
  },
});
</script>
<style scoped>
.collapse-toggle {
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
}
</style>
