<template>
  <div class="pl-2 pr-2" style="height: 100%">
    <div v-if="pending" class="d-flex justify-center align-center" style="height: 100%">
      <v-progress-circular indeterminate :size="60" />
    </div>
    <template v-else>
      <SpellItem v-for="spell in spells" :spell="spell" :key="spell.id" short />
    </template>
    <div class="d-flex justify-center align-center" style="height: 20px" v-if="showLoader">
      <InfiniteLoading @infinite="loadNextPage" />
    </div>
  </div>
</template>
<script lang="ts">
import { ChacacterClass } from '@/types/CharacterClass';
import { ClassViewModel } from '@/types/Class/ClassViewModel';
import { Pagination } from '@/types/Pagination';
import { SpellFilters } from '@/types/Spell/Spell';
import { defineComponent, PropType } from 'vue';
import SpellItem from '../spell/SpellItem.vue';
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';

export default defineComponent({
  props: {
    classModel: {
      type: Object as PropType<ClassViewModel>,
      default: () => ClassViewModel.getEmpty(),
    },
  },
  components: {
    SpellItem,
    InfiniteLoading,
  },
  created() {
    const unwatch = this.$watch(
      () => this.$route.params,
      () => {
        const filters = new SpellFilters({ class: this.classModel.index as ChacacterClass });
        this.$store.commit('spells/setCurrentFilters', filters);
        this.$nextTick(() => {
          this.$store.dispatch('spells/fetchSpellList', {
            pagination: (this.$store.state.spells.pagination as Pagination).currentPage,
          });
          unwatch();
        });
      },
      { immediate: true }
    );
  },
  computed: {
    spells() {
      return this.$store.state.spells.spellList;
    },
    pending() {
      return this.$store.state.spells.spellListPending && this.spells.length === 0;
    },
    showLoader() {
      if (this.$store.state.spells.pagination.total) {
        return this.spells.length > 0 && this.$store.state.spells.pagination.total > this.spells.length;
      }
      return this.spells.length > 0;
    },
  },
  methods: {
    loadNextPage() {
      if ((this.$store.state.spells.pagination as Pagination).hasNextPage && !this.pending) {
        this.$store.dispatch('spells/fetchMoreSpellList', {
          pagination: (this.$store.state.spells.pagination as Pagination).nextPage,
        });
      }
    },
  },
  beforeUnmount() {
    this.$store.commit('spells/setCurrentFilters', {});
  },
});
</script>
