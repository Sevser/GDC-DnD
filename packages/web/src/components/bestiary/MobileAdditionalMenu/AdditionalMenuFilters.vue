<template>
  <v-dialog :model-value="open" @update:modelValue="handleUpdateValue" max-width="600">
    <v-card>
      <v-card-title>
        <span class="text-h5">Filter by</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" class="d-flex">
              <v-select class="mr-3" label="Size" :items="allowedSize" :model-value="filter.size" @update:modelValue="updateSize"></v-select>
              <v-btn icon="mdi-restore" color="secondary" @click="() => updateSize()" />
            </v-col>
            <v-col cols="12" class="d-flex">
              <v-select label="Type" :items="allowedTypes" :model-value="filter.type" @update:modelValue="updateType"></v-select>
              <v-btn icon="mdi-restore" color="secondary" @click="() => updateType()" />
            </v-col>
            <v-col cols="12" class="d-flex">
              <v-select label="Challenge rating" :items="allowedChallengeRating" :model-value="filter.challengeRating" @update:modelValue="updateChallengeRating"></v-select>
              <v-btn icon="mdi-restore" color="secondary" @click="() => updateChallengeRating()" />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="reset"> Reset </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="apply"> Apply </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { IBeastFilter } from '@/types/beasts/BeastFilters';
import { BeastType, BeastChallengeRating } from '@/types/beasts/BeastFilters';

interface AdditionalMenuSortData {
  dialog: boolean;
  filter: IBeastFilter;
}

export default defineComponent({
  data: (): AdditionalMenuSortData => ({
    dialog: false,
    filter: {} as IBeastFilter,
  }),
  props: {
    open: {
      type: Boolean,
    },
  },
  watch: {
    open(value) {
      if (value) {
        this.getFiltersFromStore();
      }
    },
  },
  computed: {
    allowedSize() {
      return ['Large', 'Medium', 'Huge', 'Gargantuan', 'Small', 'Tiny'];
    },
    allowedTypes() {
      return ['aberration', 'humanoid', 'dragon', 'elemental', 'monstrosity', 'construct', 'beast', 'plant', 'fiend', 'ooze', 'fey', 'giant', 'celestial', 'undead', 'swarm of Tiny beasts'];
    },
    allowedChallengeRating() {
      return [0, 0.125, 0.25, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 30];
    },
  },
  methods: {
    apply() {
      this.$store.commit('bestiary/setCurrentFilters', this.filter);
      this.handleUpdateValue(false);
    },
    updateChallengeRating(challengeRating?: BeastChallengeRating) {
      this.filter.challengeRating = challengeRating;
    },
    reset() {
      this.filter = {} as IBeastFilter;
      this.$store.commit('bestiary/setCurrentFilters', this.filter);
      this.handleUpdateValue(false);
    },
    updateType(type?: BeastType) {
      this.filter.type = type;
    },
    updateSize(size?: string) {
      this.filter.size = size;
    },
    handleUpdateValue(val: boolean) {
      if (!val) {
        this.$emit('close');
        this.$store.dispatch('bestiary/fetchBeastList', {});
        if (this.$router.currentRoute.value.name === 'BestiaryView') {
          this.$router.push({
            name: 'BestiaryList',
          });
        }
      }
    },
    getFiltersFromStore() {
      this.filter = JSON.parse(JSON.stringify(this.$store.state.bestiary.filters));
    },
  },
  mounted() {
    this.getFiltersFromStore();
  },
});
</script>
