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
        <div class="text-caption">
          <v-banner :lines="lines" :text="spell.description" class="px-0 pt-0 pb-0" :border="0" />
        </div>
        <CollapseToggle :value="collapsed" @toggle="toggle" class="collapse-toggle" />
      </div>
    </v-card-item>
  </v-card>
</template>
<script lang="ts">
import { Spell } from '@/types/Spell';
import { ICharacterClass } from '@/types/CharacterClass';
import { defineComponent } from 'vue';
import CollapseToggle from '../base/collapse/CollapseToggle.vue';
import SpellShortInfo from './SpellShortInfo.vue';

export default defineComponent({
  props: {
    spell: {
      type: Spell,
      required: true,
    },
  },
  components: {
    CollapseToggle,
    SpellShortInfo,
  },
  data: () => ({
    collapsed: false,
  }),
  methods: {
    toggle(e: boolean) {
      this.collapsed = e;
    },
  },
  computed: {
    schoolOfMagic() {
      return this.spell?.SchoolOfMagic?.SchoolOfMagic || '';
    },
    classes() {
      return this.spell?.class?.map((item: ICharacterClass) => item.class).join(', ') || '';
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
