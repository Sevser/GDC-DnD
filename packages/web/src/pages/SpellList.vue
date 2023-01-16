<template>
  <div class="pl-2 pr-2" style="height: 100%">
    <div v-if="pending" class="d-flex justify-center align-center" style="height: 100%">
      <v-progress-circular indeterminate :size="60" />
    </div>
    <template v-else>
      <SpellItem v-for="spell in spells" :spell="spell" :key="spell.id" />
    </template>
    <div class="d-flex justify-center align-center">
      <InfiniteLoading @infinite="loadNextPage" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SpellItem from '@/components/spell/SpellItem.vue';
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';
import { Pagination } from '@/types/Paginstion';

export default defineComponent({
  components: {
    SpellItem,
    InfiniteLoading,
  },
  data: () => ({}),
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.$store.dispatch('spells/fetchSpellList');
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
  },
  methods: {
    loadNextPage() {
      if ((this.$store.state.spells.pagination as Pagination).hasNextPage) {
        this.$store.dispatch('spells/fetchMoreSpellList', {
          pagination: (this.$store.state.spells.pagination as Pagination).nextPage,
        });
      }
    },
  },
});
</script>
