<template>
  <v-list density="compact">
    <v-list-subheader>Menu</v-list-subheader>

    <v-list-item v-for="(item, i) in items" :key="i" :value="item" active-color="primary" :to="{ name: item.navigation }" :active="item.navigation === activeRoute">
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
  computed: {
    activeRoute() {
      return this.$route.name;
    },
  },
  data: () => ({
    items: [
      {
        icon: 'mdi-inbox',
        text: 'Home',
        navigation: 'Home',
      },
      {
        icon: 'mdi-star',
        text: 'Spells',
        navigation: 'SpellList',
      },
      {
        icon: 'mdi-alien',
        text: 'Bestiary',
        navigation: 'BestiaryList',
      },
      {
        icon: 'mdi-book',
        text: 'DictionaryList',
        navigation: 'DictionaryList',
      },
      {
        icon: 'mdi-book',
        text: 'RulesList',
        navigation: 'RulesList',
      },
      {
        icon: 'mdi-human',
        text: 'RaceList',
        navigation: 'RaceList',
      },
      {
        icon: 'mdi-human',
        text: 'ClassList',
        navigation: 'ClassList',
      },
      {
        icon: 'mdi-shield',
        text: 'ArmorList',
        navigation: 'ArmorList',
      },
      {
        icon: 'mdi-swords-cross',
        text: 'WeaponList',
        navigation: 'WeaponList',
      },
    ],
    model: 1,
  }),
});
</script>
