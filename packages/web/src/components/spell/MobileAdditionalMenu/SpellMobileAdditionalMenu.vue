<template>
  <div class="d-flex justify-space-evenly w-100 d-sm-none">
    <v-btn elevation="2" rounded color="primary" size="small">Фильтры</v-btn>
    <v-btn elevation="2" rounded color="primary" size="small" @click="openSort = true">Сортировка</v-btn>
    <v-btn elevation="2" rounded color="primary" size="small">Избранное</v-btn>
    <AdditionalMenuSort :open="openSort" @close="openSort = false" />
  </div>
</template>
<script lang="ts">
import AdditionalMenuSort from './AdditionalMenuSort.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    AdditionalMenuSort,
  },
  data: () => ({
    openSort: false,
  }),
});
</script>
