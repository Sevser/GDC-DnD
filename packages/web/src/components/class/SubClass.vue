<template>
  <v-expansion-panel :title="subclass.name">
    <template #text>
      <div class="pt-2 pb-2">
        <div class="text-h6 text-left w-100 mt-5 mb-5">Description</div>
        <div class="d-flex flex-wrap">
          {{ subclass.desc }}
        </div>
      </div>
      <level-table v-if="levels.length" :levels="levels" />
    </template>
  </v-expansion-panel>
</template>
<script lang="ts">
import { SubclassModel } from '@/types/Subclass/Subclass';
import { defineComponent, PropType } from 'vue';
import LevelTable from './LevelTable.vue';

export default defineComponent({
  components: {
    LevelTable,
  },
  props: {
    subclass: {
      type: Object as PropType<SubclassModel>,
      default: () => SubclassModel.getEmpty(),
    },
  },
  computed: {
    levels() {
      return this.$store.state.classes.classLevels.filter((level) => level.name === this.subclass.index);
    },
  },
});
</script>
