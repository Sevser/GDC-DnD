<template>
  <v-navigation-drawer v-model="drawer" app> <NavigationMenu /></v-navigation-drawer>
  <v-layout>
    <v-app-bar absolute hide-on-scroll prominent ref="appBar">
      <v-app-bar-nav-icon @click="drawer = !drawer"> </v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <template #extension v-if="showMobileAdditionalMenu">
        <router-view name="mobileAdditionalMenu"></router-view>
      </template>
    </v-app-bar>
    <v-main>
      <v-sheet id="scrolling-techniques-4" class="overflow-y-auto" :max-height="maxHeight" :height="maxHeight">
        <router-view></router-view>
      </v-sheet>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import NavigationMenu from '@/components/menu/NavigationMenu.vue';
import { ComponentPublicInstance } from '@vue/runtime-dom';

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
    maxHeight: 10000,
    showMobileAdditionalMenu: false,
  }),
  methods: {
    handleResize() {
      this.showMobileAdditionalMenu = document.body.clientWidth < 560;
      setTimeout(() => {
        if (this.$refs.appBar) {
          this.maxHeight = document.body.clientHeight - (this.$refs.appBar as ComponentPublicInstance).$el.clientHeight;
        }
      }, 1500);
    },
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  },
  mounted() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  },
};
</script>
