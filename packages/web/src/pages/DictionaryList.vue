<template>
  <default-layout>
    <div class="pl-2 pr-2" style="height: 100%">
      <div v-if="pending" class="d-flex justify-center align-center" style="height: 100%">
        <v-progress-circular indeterminate :size="60" />
      </div>
      <template v-else>
        <v-container fluid>
          <v-row dense>
            <v-col v-for="dictionary in dictionaries" :key="dictionary.title" cols="4">
              <v-card :title="dictionary.title" :subtitle="dictionary.subtitie" class="mb-4" @click="() => handleClickDictionary(dictionary)" />
            </v-col>
          </v-row>
        </v-container>
      </template>
    </div>
  </default-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DefaultLayout from '@/layout/default/DefaultLayout.vue';
import { IDictionary } from '@/types/Dictionaries/Dictionary';

interface IDataDictionaryList {
  unwatch: any;
}
export default defineComponent({
  components: {
    DefaultLayout,
  },
  data: (): IDataDictionaryList => ({
    unwatch: null,
  }),
  created() {
    this.unwatch = this.$watch(
      () => this.$route.params,
      () => {
        this.$store.dispatch('dictionary/fetchDictionaries');
      },
      { immediate: true }
    );
  },
  computed: {
    dictionaries() {
      return this.$store.state.dictionary.dictionariesList;
    },
    pending() {
      return this.$store.state.dictionary.dictionariesListPending && this.dictionaries.length === 0;
    },
  },
  beforeUnmount() {
    this.unwatch();
  },
  methods: {
    handleClickDictionary(dictionary: IDictionary) {
      this.$store.commit('dictionary/updateCurrentDicrionary', dictionary);
      this.$router.push({ name: 'DictionaryView', params: { id: dictionary.collectionName } });
    },
  },
});
</script>
>
