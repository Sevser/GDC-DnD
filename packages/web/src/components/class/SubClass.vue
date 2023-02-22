<template>
  <v-expansion-panel :title="subclass.name">
    <template #text>
      {{ subclass.desc }}
    </template>
  </v-expansion-panel>
</template>
<script lang="ts">
import { SubclassModel } from '@/types/Subclass/Subclass';
import { defineComponent, PropType } from 'vue';
export default defineComponent({
  props: {
    subclass: {
      type: Object as PropType<SubclassModel>,
      default: () => SubclassModel.getEmpty(),
    },
  },
});
</script>
