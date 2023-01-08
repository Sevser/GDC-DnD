<template>
  <v-card class="mx-auto" width="400">
    <template #title>{{ spell.title }}</template>

    <template #text><v-banner lines="two" :text="spell.description"> </v-banner></template>
  </v-card>
</template>
<script lang="ts">
import { Spell } from '@/types/Spell';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    spell: {
      type: Spell,
      required: true,
    },
  },
});
</script>
