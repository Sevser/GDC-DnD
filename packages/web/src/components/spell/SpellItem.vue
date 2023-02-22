<template>
  <SpellItemShort :spell="spell" v-if="short" />
  <SpellItemDefault :spell="spell" v-else />
</template>
<script lang="ts">
import { ShortSpellModel } from '@/types/Spell/Spell';
import SpellItemShort from './SpellItemShort.vue';
import SpellItemDefault from './SpellItemDefault.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    spell: {
      type: ShortSpellModel,
      required: true,
    },
    short: {
      type: Boolean,
    },
  },
  components: {
    SpellItemShort,
    SpellItemDefault,
  },
});
</script>
