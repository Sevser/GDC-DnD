<template>
  <div v-if="$vuetify.display.xs" class="pl-3 pt-3 pb-3">
    <v-btn :to="{ name: 'ClassList' }"> Назад </v-btn>
  </div>
  <v-card :class="{ 'h-100': !$vuetify.display.xs, 'h-calc': $vuetify.display.xs, 'overflow-y-auto': true }">
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab value="one">Base info</v-tab>
      <v-tab value="two">Archetypes</v-tab>
      <v-tab value="three">Description</v-tab>
      <v-tab value="four">Spells</v-tab>
      <v-tab value="five">Gallery</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <ClassBaseInfo :class-model="classModel" />
        </v-window-item>
        <v-window-item value="two">
          <Subclasses :class-model="classModel" />
        </v-window-item>
        <v-window-item value="three"> Three </v-window-item>
        <v-window-item value="four"> four </v-window-item>
        <v-window-item value="five"> five </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { ClassViewModel } from '@/types/Class/ClassViewModel';
import ClassBaseInfo from '@/components/class/ClassBaseInfo.vue';
import Subclasses from '@/components/class/SubClasses.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    ClassBaseInfo,
    Subclasses,
  },
  watch: {
    '$route.params': {
      immediate: true,
      deep: true,
      handler() {
        if (this.$router.currentRoute !== undefined && this.$router.currentRoute.value.name === 'ClassView') {
          this.fetchData();
        }
      },
    },
  },
  methods: {
    fetchData() {
      this.$store.dispatch('classes/fetchClass', this.$route.params.id);
      this.$store.dispatch('classes/fetchClassLevels', this.$route.params.id);
    },
  },
  data: () => ({
    tab: 'one',
  }),
  computed: {
    classModel() {
      return this.$store.state.classes.class || ClassViewModel.getEmpty();
    },
  },
});
</script>
