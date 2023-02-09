<template>
  <SpellItemShort :spell="spell" v-if="short" />
  <SpellItemDefault :spell="spell" v-else />
</template>
<script lang="ts">
import { Spell } from '@/types/Spell/Spell';
import SpellItemShort from './SpellItemShort.vue';
import SpellItemDefault from './SpellItemDefault.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    spell: {
      type: Spell,
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
