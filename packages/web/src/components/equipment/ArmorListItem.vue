<template>
  <v-card class="mb-4" :id="armor.index" :title="armor.name">
    <template #text>
      <div class="d-flex justify-space-between">
        <div class="text-subtitle-1">
          {{ armorClass }}
        </div>
        <div class="text-subtitle-1">
          {{ cost }}
        </div>
      </div>
    </template>
  </v-card>
</template>
<script lang="ts">
import { ArmorModel } from '@/types/Armor/Armor';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    armor: {
      type: Object as PropType<ArmorModel>,
      default: () => ArmorModel.getEmpty(),
    },
  },
  computed: {
    armorClass() {
      if (this.armor.armorClassEquipment.dexBonus) {
        return `${this.armor.armorClassEquipment.base} + dexterity bonus`;
      }
      return this.armor.armorClassEquipment.base;
    },
    cost() {
      return `${this.armor.cost.quantity} ${this.armor.cost.unit}`;
    },
  },
});
</script>
