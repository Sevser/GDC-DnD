<template>
  <div class="d-flex sm-justify-space-evenly w-100">
    <v-btn class="mr-4" elevation="2" color="primary" variant="outlined" :size="buttonSize" @click="openFilters = true">Фильтры</v-btn>
    <v-btn class="mr-4" elevation="2" color="primary" variant="outlined" :size="buttonSize" @click="openSort = true">Сортировка</v-btn>
    <v-btn class="mr-4" elevation="2" color="primary" variant="outlined" :size="buttonSize">Избранное</v-btn>
    <AdditionalMenuSort :open="openSort" @close="openSort = false" />
    <AdditionalMenuFilters :open="openFilters" @close="openFilters = false" />
  </div>
</template>
<script lang="ts">
import AdditionalMenuSort from './AdditionalMenuSort.vue';
import AdditionalMenuFilters from './AdditionalMenuFilters.vue';
import { defineComponent } from 'vue';

// todo: добавить поиск заклинаний

export default defineComponent({
  components: {
    AdditionalMenuSort,
    AdditionalMenuFilters,
  },
  data: () => ({
    openSort: false,
    openFilters: false,
  }),
  computed: {
    buttonSize() {
      if (this.$vuetify.display.xs) {
        return undefined;
      }
      return 'small';
    },
  },
});
</script>
