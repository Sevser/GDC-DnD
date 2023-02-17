<template>
  <list-preview-layout>
    <div class="pl-2 pr-2" style="height: 100%">
      <div v-if="pending" class="d-flex justify-center align-center" style="height: 100%">
        <v-progress-circular indeterminate :size="60" />
      </div>
      <template v-else>
        <v-container fluid>
          <v-row dense>
            <v-col v-for="classModel in classes" :key="classModel.name" :cols="cols">
              <ClassListItem :class-model="classModel" @click="handleClick(classModel)" />
            </v-col>
          </v-row>
        </v-container>
      </template>
    </div>
  </list-preview-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import 'v3-infinite-loading/lib/style.css';
import ListPreviewLayout from '../layout/ListPreviewLayout/ListPreviewLayout.vue';
import { IRaceListItemModel } from '@/types/Race/RaceListItem';
import ClassListItem from '@/components/class/ClassListItem.vue';
import { IClassListItemModel } from '@/types/Class/ClassListItemModel';

export default defineComponent({
  components: {
    ListPreviewLayout,
    ClassListItem,
  },
  data: () => ({}),
  created() {
    const unwatch = this.$watch(
      () => this.$route.params,
      () => {
        this.$store.dispatch('classes/fetchClassList');
        this.$nextTick(() => unwatch());
      },
      { immediate: true }
    );
  },
  computed: {
    cols() {
      if (this.openedItem) {
        if (this.$vuetify.display.xs || this.$vuetify.display.sm || this.$vuetify.display.md) {
          return 12;
        }
        return 6;
      }
      if (this.$vuetify.display.xs) {
        return 12;
      }
      if (this.$vuetify.display.sm || this.$vuetify.display.md) {
        return 6;
      }
      if (this.$vuetify.display.xl || this.$vuetify.display.xxl) {
        return 3;
      }
      return 4;
    },
    openedItem() {
      return this.$router.currentRoute.value.name === 'ClassView';
    },
    pending() {
      return this.$store.state.classes.classListPending && this.classes.length === 0;
    },
    classes() {
      return this.$store.state.classes.classList;
    },
  },
  methods: {
    handleClick(beast: IClassListItemModel) {
      this.$router.push({
        name: 'ClassView',
        params: {
          id: beast.id,
        },
      });
    },
  },
});
</script>
