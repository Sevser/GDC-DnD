<template>
  <v-card class="mx-auto mb-2 race-item">
    <v-card-item style="padding: 0">
      <v-img class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px" cover>
        <div class="d-flex align-center h-100 flex-column pt-2 pl-6">
          <div class="text-h6 mb-1 align-self-start mb-3">
            {{ race.name }}
          </div>
          <div class="d-flex w-100 mb-1 flex-wrap">
            <v-btn color="success" class="mr-2 mb-2" v-for="ability in race.abilityBonuses" :key="ability.id" size="small"> {{ ability.abilityScore.name }} +{{ ability.bonus }} </v-btn>
          </div>
          <div class="">
            {{ race.tabDescription }}
          </div>
        </div>
      </v-img>
    </v-card-item>
  </v-card>
</template>
<script lang="ts">
import { RaceListItemModel } from '@/types/Race/RaceListItem';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    race: {
      type: RaceListItemModel,
      default: () => RaceListItemModel.getEmpty(),
    },
  },
});
</script>
<style>
.race-item .v-responsive__content {
  height: 100%;
}
</style>
