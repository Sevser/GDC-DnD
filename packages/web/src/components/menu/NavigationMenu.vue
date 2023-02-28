<template>
  <v-list density="compact">
    <v-list-subheader>Menu</v-list-subheader>
    <v-list-item v-for="(item, i) in items" :key="i" :value="item" active-color="primary" :to="{ name: item.navigation }" @click="$emit('NavigationClicked')" :active="item.navigation === activeRoute">
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
        icon: 'mdi-auto-fix',
        text: 'Spells',
        navigation: 'SpellList',
      },
      {
        icon: 'mdi-dog-side',
        text: 'Bestiary',
        navigation: 'BestiaryList',
      },
      {
        icon: 'mdi-book',
        text: 'Dictionaries',
        navigation: 'DictionaryList',
      },
      {
        icon: 'mdi-book-education',
        text: 'Rules',
        navigation: 'RulesList',
      },
      {
        icon: 'mdi-human-queue',
        text: 'Races',
        navigation: 'RaceList',
      },
      {
        icon: 'mdi-human',
        text: 'Classes',
        navigation: 'ClassList',
      },
      {
        icon: 'mdi-shield',
        text: 'Armor',
        navigation: 'ArmorList',
      },
      {
        icon: 'mdi-sword',
        text: 'Weapon',
        navigation: 'WeaponList',
      },
      {
        icon: 'mdi-bag-personal-outline',
        text: 'Equipment',
        navigation: 'EquipmentList',
      },
      {
        icon: 'mdi-bag-personal-outline',
        text: 'Magic Items',
        navigation: 'MagicItemList',
      },
    ],
    model: 1,
  }),
});
</script>
