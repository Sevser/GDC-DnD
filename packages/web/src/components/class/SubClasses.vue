<template>
  <v-expansion-panels class="d-flex flex-wrap" multiple>
    <sub-class v-for="subclass in subclasses" :key="subclass.index" :subclass="subclass" />
  </v-expansion-panels>
</template>
<script lang="ts">
import { ClassViewModel } from '@/types/Class/ClassViewModel';
import { ISubclassModel } from '@/types/Subclass/Subclass';
import { defineComponent, PropType } from 'vue';
import SubClass from './SubClass.vue';

export default defineComponent({
  components: {
    SubClass,
  },
  props: {
    classModel: {
      type: Object as PropType<ClassViewModel>,
      default: () => ClassViewModel.getEmpty(),
    },
  },
  methods: {
    fetchArhetypes() {
      this.$store.dispatch('classes/fetchClassArchetypes', this.classModel.id);
    },
  },
  computed: {
    subclasses() {
      return this.$store.state.classes.classArchetypes.filter((sub) => sub.class.index === this.classModel.index) || new Array<ISubclassModel>();
    },
    pending() {
      return this.$store.state.classes.classArchetypesPending;
    },
  },
  mounted() {
    this.fetchArhetypes();
  },
});
</script>
