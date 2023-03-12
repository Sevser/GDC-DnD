<template>
  <list-preview-layout>
    <div class="pl-2 pr-2" style="height: 100%">
      <div v-if="pending" class="d-flex justify-center align-center" style="height: 100%">
        <v-progress-circular indeterminate :size="60" />
      </div>
      <template v-else>
        <v-container fluid>
          <v-row dense>
            <v-col v-for="race in races" :key="race.name" :cols="cols">
              <race-item :race="race" @click="handleClick(race)" />
            </v-col>
          </v-row>
        </v-container>
      </template>
    </div>
  </list-preview-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import 'v3-infinite-loading/lib/style.css';
import ListPreviewLayout from '../../layout/ListPreviewLayout/ListPreviewLayout.vue';
import { IRaceListItemModel } from '@/types/Race/RaceListItem';
import RaceItem from '@/components/race/RaceItem.vue';

export default defineComponent({
  components: {
    ListPreviewLayout,
    RaceItem,
  },
  data: () => ({}),
  created() {
    const unwatch = this.$watch(
      () => this.$route.params,
      () => {
        this.$store.dispatch('race/fetchRaceList');
        this.$nextTick(() => unwatch());
      },
      { immediate: true }
    );
  },
  computed: {
    cols() {
      if (this.openedItem) {
        if (this.$vuetify.display.xs || this.$vuetify.display.sm || this.$vuetify.display.md) {
          return 12;
        }
        return 6;
      }
      if (this.$vuetify.display.xs) {
        return 12;
      }
      if (this.$vuetify.display.sm || this.$vuetify.display.md) {
        return 6;
      }
      if (this.$vuetify.display.xl || this.$vuetify.display.xxl) {
        return 3;
      }
      return 4;
    },
    openedItem() {
      return this.$router.currentRoute.value.name === 'RaceView';
    },
    pending() {
      return this.$store.state.race.raceList && this.races.length === 0;
    },
    races() {
      return this.$store.state.race.raceList;
    },
  },
  methods: {
    handleClick(beast: IRaceListItemModel) {
      this.$router.push({
        name: 'RaceView',
        params: {
          id: beast.id,
        },
      });
    },
  },
});
</script>
