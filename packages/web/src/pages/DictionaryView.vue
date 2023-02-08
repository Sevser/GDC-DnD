<template>
  <default-layout>
    <div class="pl-2 pr-2" style="height: 100%">
      <div v-if="false" class="d-flex justify-center align-center" style="height: 100%">
        <v-progress-circular indeterminate :size="60" />
      </div>
      <template v-else> <DictionaryViewListItem v-for="item in items" :key="item.name" :dictionary-list-item="item" /> </template>
    </div>
  </default-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DefaultLayout from '@/layout/default/DefaultLayout.vue';
import DictionaryViewListItem from '@/components/dictionaries/DictionaryViewListItem.vue';

export default defineComponent({
  components: {
    DefaultLayout,
    DictionaryViewListItem,
  },
  created() {
    const unwatch = this.$watch(
      () => this.$route.params,
      () => {
        this.$store.dispatch('dictionary/fetchDicrionary', this.$route.params.id);
        this.$nextTick(() => unwatch());
      },
      { immediate: true }
    );
  },
  computed: {
    items() {
      return this.$store.state.dictionary.dictionaryContent;
    },
    pending() {
      return this.$store.state.dictionary.dictionaryContentPending && (this.items === undefined || this.items.length === 0);
    },
  },
  beforeUnmount() {
    this.$store.commit('dictionary/updateCurrentDicrionary');
  },
});
</script>
