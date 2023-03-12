<template>
  <div v-if="$vuetify.display.xs" class="pl-3 pt-3 pb-3">
    <v-btn :to="{ name: 'EquipmentList' }"> Назад </v-btn>
  </div>
  <v-card :class="{ 'h-100': !$vuetify.display.xs, 'h-calc': $vuetify.display.xs, 'overflow-y-auto': true }">
    <template #title>
      <div class="text-h4">
        {{ equipment.name }}
      </div>
    </template>
    <template #text>
      <div class="d-flex flex-column">
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Cost:</div>
          <div>
            {{ cost }}
          </div>
        </div>
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Weight:</div>
          <div>
            {{ equipment.weight }}
          </div>
        </div>
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Desc:</div>
          <div>
            {{ equipment.desc }}
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
        if (this.$router.currentRoute !== undefined && this.$router.currentRoute.value.name === 'EquipmentView') {
          this.fetchData();
        }
      },
    },
  },
  methods: {
    fetchData() {
      this.$store.dispatch('equipment/fetchEquipment', this.$route.params.id);
    },
  },
  computed: {
    equipment() {
      return this.$store.state.equipment.equipment;
    },
    cost() {
      return `${this.equipment.cost.quantity} ${this.equipment.cost.unit}`;
    },
  },
});
</script>
<style scoped>
.h-calc {
  height: calc(100% - 60px);
}
</style>
