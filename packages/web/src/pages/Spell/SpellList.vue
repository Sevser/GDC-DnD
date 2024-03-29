<template>
  <ListPreviewLayout>
    <div class="pl-2 pr-2" style="height: 100%">
      <div v-if="pending" class="d-flex justify-center align-center" style="height: 100%">
        <v-progress-circular indeterminate :size="60" />
      </div>
      <template v-else>
        <SpellItem v-for="spell in spells" :spell="spell" :key="spell.id" short @click="handleClick(spell)" />
      </template>
      <div class="d-flex justify-center align-center" style="height: 20px" v-if="showLoader">
        <InfiniteLoading @infinite="loadNextPage" />
      </div>
      <div v-if="hasNoSpells" class="d-flex flex-column p-4 justify-center align-center h-100">
        <div class="text-h4 mb-4">Фильтры слишком жесткие</div>
        <v-btn prepend-icon="mdi-restore" color="secondary" @click="resetFilters"> сбросить фильтры </v-btn>
      </div>
    </div>
  </ListPreviewLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SpellItem from '@/components/spell/SpellItem.vue';
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';
import { Pagination } from '@/types/Pagination';
import ListPreviewLayout from '@/layout/ListPreviewLayout/ListPreviewLayout.vue';
import { ShortSpellModel } from '@/types/Spell/Spell';

export default defineComponent({
  components: {
    SpellItem,
    InfiniteLoading,
    ListPreviewLayout,
  },
  data: () => ({}),
  created() {
    const unwatch = this.$watch(
      () => this.$route.params,
      () => {
        this.$store.dispatch('spells/fetchSpellList', {
          pagination: (this.$store.state.spells.pagination as Pagination).currentPage,
        });
        this.$nextTick(() => unwatch());
      },
      { immediate: true }
    );
  },
  computed: {
    hasNoSpells() {
      return this.$store.state.spells?.pagination?.total === 0;
    },
    showLoader() {
      if (this.$store.state.spells.pagination.total) {
        return this.spells.length > 0 && this.$store.state.spells.pagination.total > this.spells.length;
      }
      return this.spells.length > 0;
    },
    spells() {
      return this.$store.state.spells.spellList;
    },
    pending() {
      return this.$store.state.spells.spellListPending && this.spells.length === 0;
    },
  },
  methods: {
    resetFilters() {
      this.$store.commit('spells/setCurrentFilters', {});
      this.$store.dispatch('spells/fetchSpellList', {});
    },
    handleClick(spell: ShortSpellModel) {
      this.$router.push({
        name: 'SpellView',
        params: {
          id: spell.id,
        },
      });
    },
    loadNextPage() {
      if ((this.$store.state.spells.pagination as Pagination).hasNextPage && !this.pending) {
        this.$store.dispatch('spells/fetchMoreSpellList', {
          pagination: (this.$store.state.spells.pagination as Pagination).nextPage,
        });
      }
    },
  },
});
</script>
