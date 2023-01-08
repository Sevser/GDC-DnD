<template>
  <div class="pl-2 pr-2" style="height: 100%">
    <div v-if="pending" class="d-flex justify-center align-center" style="height: 100%">
      <v-progress-circular indeterminate :size="60" />
    </div>
    <template v-else>
      <SpellItem v-for="spell in spells" :spell="spell" :key="spell.id" />
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Spell } from '@/types/Spell';
import { IPagination } from '@/types/GenericStrapiData';
import SpellItem from '@/components/spell/SpellItem.vue';

export default defineComponent({
  components: {
    SpellItem,
  },
  data: () => ({
    spells: new Array<Spell>(),
    pagination: {} as IPagination,
    pending: false,
  }),
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchSpells();
      },
      { immediate: true }
    );
  },
  methods: {
    async fetchSpells() {
      this.pending = true;
      this.spells = [];
      this.pagination = {} as IPagination;
      try {
        const result = await this.$cmsClient.fetchSpells();
        this.spells = result.data;
        this.pagination = result.meta.pagination;
        // Todo: add toast to handle error;
        // eslint-disable-next-line
      } catch {
      } finally {
        this.pending = false;
      }
    },
  },
});
</script>
