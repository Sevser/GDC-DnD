<template>
  <v-app>
    <DefaultLayout>
      <router-view />
    </DefaultLayout>
  </v-app>
</template>

<script lang="ts">
import DefaultLayout from './layout/DefaultLayout.vue';

export default {
  components: {
    DefaultLayout,
  },
};
</script>
<style>
html,
body,
#app {
  height: 100% !important;
  width: 100% !important;
}
</style>
