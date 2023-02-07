<template>
  <div class="d-flex">
    <div class="d-flex flex-column">
      <div class="text-subtitle-2 mr-2">HP</div>
      <div>{{ hp }}</div>
    </div>
    <div class="d-flex flex-column">
      <div class="text-subtitle-2 mr-2">Armor class</div>
      <div>{{ ac }}</div>
    </div>
    <div class="d-flex flex-column">
      <div class="text-subtitle-2 mr-2">Speed</div>
      <div>{{ speed }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { IArmorClass } from '@/types/ArmorClass/ArmorClass';
import { BeastModel } from '@/types/beasts/Beast';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    beast: {
      type: BeastModel,
      default: BeastModel.getEmpty(),
    },
  },
  computed: {
    hp() {
      return `${this.beast.hit_points} (${this.beast.hit_points_roll})`;
    },
    ac() {
      return this.beast?.armorClass?.map((ac: IArmorClass) => `${ac.value} (${ac.type})`)?.join(', ');
    },
    speed() {
      const result = new Array<string>();
      if (this.beast?.speed?.walk) {
        result.push(`walk: ${this.beast.speed.walk}`);
      }
      if (this.beast?.speed?.fly) {
        result.push(`fly: ${this.beast.speed.fly}`);
      }
      if (this.beast?.speed?.swim) {
        result.push(`swim: ${this.beast.speed.swim}`);
      }
      return result.join(', ');
    },
  },
});
</script>
