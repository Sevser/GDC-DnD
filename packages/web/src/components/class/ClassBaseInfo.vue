<template>
  <div class="f-dlex flex-column w-100 pl-6 pr-6 pt-4">
    <div class="text-h5 mb-4">
      {{ title }}
    </div>
    <level-table :levels="levels" />
    <div class="pt-2 pb-2">
      <div class="text-h6 text-left w-100 mt-5 mb-5">Proficiencies</div>
      <div class="d-flex flex-wrap">
        <v-chip v-for="prof in classModel.proficiencies" :key="prof.name" class="mr-2 mb-1">
          {{ prof.name }}
        </v-chip>
      </div>
    </div>
    <div class="pt-2 pb-2">
      <div class="text-h6 text-left w-100 mt-5 mb-5">Proficiencies choise</div>
      <v-expansion-panels class="d-flex flex-wrap" multiple>
        <proficiency-choise v-for="prof in classModel.proficiencyChoices" :key="prof.id" class="mr-2 mb-1" :proficiency-choise="prof" />
      </v-expansion-panels>
    </div>
    <div class="pt-2 pb-2">
      <div class="text-h6 text-left w-100 mt-5 mb-5">Saving Throws</div>
      <div class="d-flex flex-wrap">
        <v-chip v-for="st in classModel.savingThrows" :key="st.name" class="mr-2 mb-1">
          {{ st.name }}
        </v-chip>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ClassViewModel } from '@/types/Class/ClassViewModel';
import { defineComponent, PropType } from 'vue';
import ProficiencyChoise from './ProficiencyChoise.vue';
import LevelTable from '@/components/class/LevelTable.vue';

export default defineComponent({
  props: {
    classModel: {
      type: Object as PropType<ClassViewModel>,
      default: () => ClassViewModel.getEmpty(),
    },
  },
  components: {
    ProficiencyChoise,
    LevelTable,
  },
  computed: {
    title() {
      return this.classModel.name;
    },
    levels() {
      return this.$store.state.classes.classLevels.filter((level) => level.name === this.classModel.index);
    },
  },
});
</script>
