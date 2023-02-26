<template>
  <v-card class="mb-4" :id="weapon.index" :title="weapon.name">
    <template #text>
      <div class="d-flex justify-space-between">
        <div class="text-subtitle-1">
          {{ damage }}
        </div>
        <div class="text-subtitle-1">
          {{ cost }}
        </div>
      </div>
    </template>
  </v-card>
</template>
<script lang="ts">
import { WeaponModel } from '@/types/Weapon/Weapon';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    weapon: {
      type: Object as PropType<WeaponModel>,
      default: () => WeaponModel.getEmpty(),
    },
  },
  computed: {
    damage() {
      return this.weapon.damage?.damageDice;
    },
    cost() {
      return `${this.weapon.cost.quantity} ${this.weapon.cost.unit}`;
    },
  },
});
</script>
