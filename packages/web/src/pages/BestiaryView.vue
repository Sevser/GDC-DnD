<template>
  <div v-if="$vuetify.display.xs" class="pl-3 pt-3 pb-3">
    <v-btn :to="{ name: 'SpellList' }"> Назад </v-btn>
  </div>
  <v-card :class="{ 'h-100': !$vuetify.display.xs, 'h-calc': $vuetify.display.xs, 'overflow-y-auto': true }">
    <template #title>
      {{ beast.name }}
    </template>
    <template #text>
      {{ beast }}
    </template>
  </v-card>
</template>
<script lang="ts">
import { IBeastModel } from '@/types/beasts/Beast';
import { defineComponent } from 'vue';

export default defineComponent({
  watch: {
    '$route.params': {
      immediate: true,
      deep: true,
      handler() {
        if (this.$router.currentRoute !== undefined && this.$router.currentRoute.value.name === 'BestiaryView') {
          this.fetchData();
        }
      },
    },
  },
  methods: {
    fetchData() {
      this.$store.dispatch('bestiary/fetchBeast', this.$route.params.id);
    },
  },
  computed: {
    beast() {
      return this.$store.state.bestiary.beast || ({} as IBeastModel);
    },
  },
});
</script>
<style scoped>
.h-calc {
  height: calc(100% - 60px);
}
</style>
