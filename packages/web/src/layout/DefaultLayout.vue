<template>
  <v-navigation-drawer v-model="drawer" app> <NavigationMenu /></v-navigation-drawer>

  <v-app-bar app>
    <v-app-bar-nav-icon @click="drawer = !drawer"> </v-app-bar-nav-icon>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
  </v-app-bar>

  <v-main>
    <slot></slot>
  </v-main>
</template>

<script lang="ts">
import NavigationMenu from '@/components/menu/NavigationMenu.vue';

export default {
  name: 'DefaultLayout',
  components: {
    NavigationMenu,
  },
  computed: {
    title() {
      // todo: read name from package.json
      return this.$route.name || import.meta.env.VITE_APP_TITLE;
    },
  },
  data: () => ({
    drawer: false,
  }),
};
</script>
