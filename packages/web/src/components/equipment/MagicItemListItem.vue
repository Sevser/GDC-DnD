<template>
  <v-card class="mb-4" :id="magicItem.index" :title="magicItem.name">
    <template #text>
      <div class="d-flex justify-space-between">
        <div class="text-subtitle-1">
          {{ magicItem.equipmentCategory.name }}
        </div>
        <div class="text-subtitle-1">
          {{ magicItem.rarity }}
        </div>
      </div>
    </template>
  </v-card>
</template>
<script lang="ts">
import { MagicItemListItem } from '@/types/Equipment/MagicItem';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    magicItem: {
      type: Object as PropType<MagicItemListItem>,
      default: () => MagicItemListItem.getEmpty(),
    },
  },
});
</script>
