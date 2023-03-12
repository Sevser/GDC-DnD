<template>
  <div v-if="$vuetify.display.xs" class="pl-3 pt-3 pb-3">
    <v-btn :to="{ name: 'MagicItemList' }"> Назад </v-btn>
  </div>
  <v-card :class="{ 'h-100': !$vuetify.display.xs, 'h-calc': $vuetify.display.xs, 'overflow-y-auto': true }">
    <template #title>
      <div class="text-h4">
        {{ magicItem.name }}
      </div>
    </template>
    <template #text>
      <div class="d-flex flex-column">
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Rarity:</div>
          <div>
            {{ magicItem.rarity }}
          </div>
        </div>
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Equipment category:</div>
          <div>
            {{ magicItem.equipmentCategory.name }}
          </div>
        </div>
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Description:</div>
          <div>
            {{ magicItem.desc }}
          </div>
        </div>
      </div>
    </template>
  </v-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  watch: {
    '$route.params': {
      immediate: true,
      deep: true,
      handler() {
        if (this.$router.currentRoute !== undefined && this.$router.currentRoute.value.name === 'MagicItemView') {
          this.fetchData();
        }
      },
    },
  },
  methods: {
    fetchData() {
      this.$store.dispatch('equipment/fetchMagicItem', this.$route.params.id);
    },
  },
  computed: {
    magicItem() {
      return this.$store.state.equipment.magicItem;
    },
  },
});
</script>
<style scoped>
.h-calc {
  height: calc(100% - 60px);
}
</style>
