<template>
  <list-preview-layout>
    <div class="pl-2 pr-2" style="height: 100%">
      <div v-if="pending" class="d-flex justify-center align-center" style="height: 100%">
        <v-progress-circular indeterminate :size="60" />
      </div>
      <template v-else>
        <beast-item v-for="beast in beasts" :key="beast.name" :beast="beast" @click="handleClick(beast)" />
      </template>
      <div class="d-flex justify-center align-center" style="height: 20px" v-if="showLoader">
        <InfiniteLoading @infinite="loadNextPage" />
      </div>
      <div v-if="hasNoSpells" class="d-flex flex-column p-4 justify-center align-center h-100">
        <div class="text-h4 mb-4">Фильтры слишком жесткие</div>
        <v-btn prepend-icon="mdi-restore" color="secondary" @click="resetFilters"> сбросить фильтры </v-btn>
      </div>
    </div>
  </list-preview-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';
import ListPreviewLayout from '../layout/ListPreviewLayout/ListPreviewLayout.vue';
import { Pagination } from '@/types/Pagination';
import BeastItem from '@/components/bestiary/BeastItem.vue';
import { IBeastListItem } from '@/types/beasts/BeastListItem';

export default defineComponent({
  components: {
    ListPreviewLayout,
    InfiniteLoading,
    BeastItem,
  },
  data: () => ({}),
  created() {
    const unwatch = this.$watch(
      () => this.$route.params,
      () => {
        this.$store.dispatch('bestiary/fetchBeastList', {
          pagination: (this.$store.state.bestiary.pagination as Pagination).currentPage,
        });
        this.$nextTick(() => unwatch());
      },
      { immediate: true }
    );
  },
  computed: {
    pending() {
      return this.$store.state.bestiary.bestiaryListPending && this.beasts.length === 0;
    },
    beasts() {
      return this.$store.state.bestiary.bestiaryList;
    },
    hasNoSpells() {
      return this.$store.state.bestiary?.pagination?.total === 0;
    },
    showLoader() {
      if (this.$store.state.bestiary.pagination.total) {
        return this.beasts.length > 0 && this.$store.state.bestiary.pagination.total > this.beasts.length;
      }
      return this.beasts.length > 0;
    },
  },
  methods: {
    handleClick(beast: IBeastListItem) {
      this.$router.push({
        name: 'BestiaryView',
        params: {
          id: beast.id,
        },
      });
    },
    loadNextPage() {
      if ((this.$store.state.bestiary.pagination as Pagination).hasNextPage && !this.pending) {
        this.$store.dispatch('bestiary/fetchMoreBeastList', {
          pagination: (this.$store.state.bestiary.pagination as Pagination).nextPage,
        });
      }
    },
    resetFilters() {
      this.$store.commit('bestiary/setCurrentFilters', {});
      this.$store.dispatch('bestiary/fetchBeastList', {});
    },
  },
});
</script>
