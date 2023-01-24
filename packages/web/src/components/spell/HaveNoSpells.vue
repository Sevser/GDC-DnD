<template>
  <div>
    Oops... It looks like your filters are too hard.
    <v-btn variant="text" @click="resetFilters">Reset filters</v-btn>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  methods: {
    resetFilters() {
      this.$store.commit('spells/clearFilter');
      this.$store.dispatch('spells/fetchSpellList');
    },
  },
});
</script>
