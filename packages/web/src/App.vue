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
