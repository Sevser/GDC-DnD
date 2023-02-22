<template>
  <div v-if="$vuetify.display.xs" class="pl-3 pt-3 pb-3">
    <v-btn :to="{ name: 'ArmorList' }"> Назад </v-btn>
  </div>
  <v-card :class="{ 'h-100': !$vuetify.display.xs, 'h-calc': $vuetify.display.xs, 'overflow-y-auto': true }">
    <template #title>
      <div class="text-h4">
        {{ armor.name }}
      </div>
    </template>
    <template #subtitle>
      {{ armor.armorCategory }}
    </template>
    <template #text>
      <div class="d-flex flex-column">
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Armor class:</div>
          <div>
            {{ armorClass }}
          </div>
        </div>
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Cost:</div>
          <div>
            {{ cost }}
          </div>
        </div>
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Weight:</div>
          <div>
            {{ armor.weight }}
          </div>
        </div>
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Stealth disadvantage:</div>
          <div>
            {{ armor.stealthDisadvantage }}
          </div>
        </div>
        <div class="d-flex">
          <div class="text-subtitle-2 mr-2">Streingth requirement:</div>
          <div>
            {{ armor.strMinimum }}
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
        if (this.$router.currentRoute !== undefined && this.$router.currentRoute.value.name === 'ArmorView') {
          this.$store.commit(
            'equipment/updateArmor',
            this.$store.state.equipment.armorList.find((a) => a.id.toString() === this.$route.params.id.toString())
          );
        }
      },
    },
  },
  computed: {
    armor() {
      return this.$store.state.equipment.armor;
    },
    cost() {
      return `${this.armor.cost.quantity} ${this.armor.cost.unit}`;
    },
    armorClass() {
      if (this.armor.armorClassEquipment.dexBonus) {
        return `${this.armor.armorClassEquipment.base} + dexterity bonus`;
      }
      return this.armor.armorClassEquipment.base;
    },
  },
});
</script>
<style scoped>
.h-calc {
  height: calc(100% - 60px);
}
</style>
