<template>
  <div v-if="$vuetify.display.xs" class="pl-3 pt-3 pb-3">
    <v-btn :to="{ name: 'RaceList' }"> Назад </v-btn>
  </div>
  <v-card :class="{ 'h-100': !$vuetify.display.xs, 'h-calc': $vuetify.display.xs, 'overflow-y-auto': true }">
    <div class="f-dlex flex-column w-100 pl-6 pr-6 pt-4">
      <div class="text-h5">
        {{ title }}
      </div>
      <v-img class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px" cover>
        <div class="d-flex align-center h-100 flex-column pt-2 pl-6 pr-6">
          <div class="d-flex w-100 mb-1 flex-wrap justify-space-evenly">
            <div
              class="d-flex flex-column w-33 justify-center align-center"
              :style="{
                'background-color': `#000000BB`,
                color: 'white',
              }"
            >
              <div class="text-subtitle-1">Speed:</div>
              <div class="text-subtitle-2">{{ race.speed.walk }} ft.</div>
            </div>
            <div
              class="d-flex flex-column w-33 justify-center align-center"
              :style="{
                'background-color': `#000000BB`,
                color: 'white',
              }"
            >
              <div class="text-subtitle-1">Characteristics:</div>
              <div class="text-subtitle-2">{{ chars }}</div>
            </div>
          </div>
        </div>
      </v-img>
      <v-expansion-panels multiple>
        <v-expansion-panel>
          <template #title> <b class="mr-1">Size:</b> {{ race.size.Size }} </template>
          <template #text>
            <div class="pl-2 pr-2 pt-2 pb-2">
              {{ race.size.Size }}
              {{ race.sizeDescription }}
            </div>
          </template>
        </v-expansion-panel>
        <v-expansion-panel title="Alignment" :text="race.alignment"> </v-expansion-panel>
        <v-expansion-panel title="Language">
          <template #text>
            <div class="pl-2 pr-2 pt-2 pb-2">
              {{ race.languageDesc }}
              <div class="d-flex">
                <v-chip v-for="lang in race.languages" :key="lang.id" class="mr-2">
                  {{ lang.name }}
                </v-chip>
              </div>
            </div>
          </template>
        </v-expansion-panel>
        <div class="text-h6 text-left w-100 mt-5 mb-5">Traits</div>
        <v-expansion-panel v-for="trait in race.traits" :key="trait.id" :title="trait.name">
          <template #text>
            <div class="pl-2 pr-2 pt-2 pb-2">
              {{ trait.desc }}
              <div class="d-flex">
                <v-chip v-for="prof in trait.proficiencies" :key="prof.name" class="mr-2">
                  {{ prof.name }}
                </v-chip>
              </div>
            </div>
          </template>
        </v-expansion-panel>
        <div class="text-h6 text-left w-100 mt-5 mb-5">Subraces</div>
        <v-expansion-panel v-for="subrace in race.subraces" :key="subrace.id" :title="subrace.name">
          <template #text>
            <div class="pl-2 pr-2 pt-2 pb-2">
              {{ subrace.desc }}
              <div class="d-flex">
                <v-expansion-panels multiple>
                  <div class="text-h6 text-left w-100 mt-5 mb-5">Racial Traits</div>
                  <v-expansion-panel v-for="trait in subrace.racialTraits" :key="trait.name" :title="trait.name">
                    <template #text>
                      <div class="pl-2 pr-2 pt-2 pb-2">
                        {{ trait.desc }}
                        <div class="d-flex">
                          <v-chip v-for="prof in trait.proficiencies" :key="prof.name" class="mr-2">
                            {{ prof.name }}
                          </v-chip>
                        </div>
                      </div>
                    </template>
                  </v-expansion-panel>
                  <div class="text-h6 text-left w-100 mt-5 mb-5">Start Proficiencies</div>
                  <div class="d-flex flex-wrap">
                    <v-chip v-for="prof in subrace.startProficiencies" :key="prof.name" class="mr-2 mb-1">
                      {{ prof.name }}
                    </v-chip>
                  </div>
                </v-expansion-panels>
              </div>
            </div>
          </template>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-card>
</template>
<script lang="ts">
import { RaceViewItemModel } from '@/types/Race/RaceViewItem';
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
      return this.$store.state.race.race || RaceViewItemModel.getEmpty();
    },
    title() {
      return this.race.name;
    },
    chars() {
      if (this.race.name !== 'human') {
        return this.race.abilityBonuses.map((ab) => `${ab.abilityScore.name} +${ab.bonus}`).join(', ');
      }
      return 'All +1';
    },
  },
});
</script>
<style scoped>
.h-calc {
  height: calc(100% - 60px);
}
</style>
