<template>
  <v-card class="mx-auto" width="400">
    <template #title> This is a title </template>

    <v-card-text> This is content </v-card-text>
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
