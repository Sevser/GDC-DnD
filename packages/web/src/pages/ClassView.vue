<template>
  <div v-if="$vuetify.display.xs" class="pl-3 pt-3 pb-3">
    <v-btn :to="{ name: 'ClassList' }"> Назад </v-btn>
  </div>
  <v-card :class="{ 'h-100': !$vuetify.display.xs, 'h-calc': $vuetify.display.xs, 'overflow-y-auto': true }">
    <div class="f-dlex flex-column w-100 pl-6 pr-6 pt-4">
      <div class="text-h5">
        {{ title }}
      </div>
      <div class="pl-2 pr-2 pt-2 pb-2">
        <div class="text-h6 text-left w-100 mt-5 mb-5">Proficiencies</div>
        <div class="d-flex flex-wrap">
          <v-chip v-for="prof in classModel.proficiencies" :key="prof.name" class="mr-2 mb-1">
            {{ prof.name }}
          </v-chip>
        </div>
      </div>
      <div class="pl-2 pr-2 pt-2 pb-2">
        <div class="text-h6 text-left w-100 mt-5 mb-5">Saving Throws</div>
        <div class="d-flex flex-wrap">
          <v-chip v-for="st in classModel.savingThrows" :key="st.name" class="mr-2 mb-1">
            {{ st.name }}
          </v-chip>
        </div>
      </div>
    </div>
  </v-card>
</template>
<script lang="ts">
import { ClassViewModel } from '@/types/Class/ClassViewModel';
import { defineComponent } from 'vue';

export default defineComponent({
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
  computed: {
    classModel() {
      return this.$store.state.classes.class || ClassViewModel.getEmpty();
    },
    title() {
      return this.classModel.name;
    },
  },
});
</script>
