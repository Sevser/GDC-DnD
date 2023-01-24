<template>
  <div class="d-flex justify-space-evenly w-100 d-sm-none">
    <v-btn elevation="2" rounded color="primary" size="small" @click="openFilters = true">Фильтры</v-btn>
    <v-btn elevation="2" rounded color="primary" size="small" @click="openSort = true">Сортировка</v-btn>
    <v-btn elevation="2" rounded color="primary" size="small">Избранное</v-btn>
    <AdditionalMenuSort :open="openSort" @close="openSort = false" />
    <AdditionalMenuFilters :open="openFilters" @close="openFilters = false" />
  </div>
</template>
<script lang="ts">
import AdditionalMenuSort from './AdditionalMenuSort.vue';
import AdditionalMenuFilters from './AdditionalMenuFilters.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    AdditionalMenuSort,
    AdditionalMenuFilters,
  },
  data: () => ({
    openSort: false,
    openFilters: false,
  }),
});
</script>
