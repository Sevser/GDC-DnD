<template>
  <div v-if="$vuetify.display.xs" class="pl-3 pt-3 pb-3">
    <v-btn :to="{ name: 'RaceList' }"> Назад </v-btn>
  </div>
  <v-card :class="{ 'h-100': !$vuetify.display.xs, 'h-calc': $vuetify.display.xs, 'overflow-y-auto': true }">
    {{ race }}
  </v-card>
</template>
<script lang="ts">
import { IBeastModel } from '@/types/races/Beast';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  watch: {
    '$route.params': {
      immediate: true,
      deep: true,
      handler() {
        if (this.$router.currentRoute !== undefined && this.$router.currentRoute.value.name === 'RaceView') {
          this.fetchData();
        }
      },
    },
  },
  methods: {
    fetchData() {
      this.$store.dispatch('race/fetchRace', this.$route.params.id);
    },
  },
  computed: {
    race() {
      return this.$store.state.race.race || ({} as IBeastModel);
    },
  },
});
</script>
<style scoped>
.h-calc {
  height: calc(100% - 60px);
}
</style>
