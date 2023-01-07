<template>
  <v-navigation-drawer v-model="drawer" app> </v-navigation-drawer>

  <v-app-bar app>
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

    <v-toolbar-title>Application</v-toolbar-title>
  </v-app-bar>

  <v-main>
    <slot></slot>
  </v-main>
</template>

<script lang="ts">
export default {
  name: 'DefaultLayout',
  data: () => ({
    drawer: false,
  }),
};
</script>
