<template>
  <v-card class="mb-4" :id="equipment.index" :title="equipment.name">
    <template #text>
      <div class="d-flex justify-space-between">
        <div class="text-subtitle-1">
          {{ equipment.equipmentCategory.name }}
        </div>
      </div>
    </template>
  </v-card>
</template>
<script lang="ts">
import { EquipmentListItemModel } from '@/types/Equipment/EquipmentListItemModel';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    equipment: {
      type: Object as PropType<EquipmentListItemModel>,
      default: () => EquipmentListItemModel.getEmpty(),
    },
  },
});
</script>
