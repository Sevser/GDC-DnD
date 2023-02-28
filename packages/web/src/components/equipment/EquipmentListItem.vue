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
import { EquipmentListModel } from '@/types/Equipment/Equipment';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    equipment: {
      type: Object as PropType<EquipmentListModel>,
      default: () => EquipmentListModel.getEmpty(),
    },
  },
});
</script>
