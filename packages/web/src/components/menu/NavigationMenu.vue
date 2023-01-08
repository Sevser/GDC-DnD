<template>
  <v-list density="compact">
    <v-list-subheader>Menu</v-list-subheader>

    <v-list-item v-for="(item, i) in items" :key="i" :value="item" active-color="primary">
      <template #prepend>
        <v-icon :icon="item.icon"></v-icon>
      </template>

      <v-list-item-title>{{ item.text }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data: () => ({
    items: [
      {
        icon: 'mdi-inbox',
        text: 'Home',
      },
      {
        icon: 'mdi-star',
        text: 'Spells',
      },
    ],
    model: 1,
  }),
});
</script>
