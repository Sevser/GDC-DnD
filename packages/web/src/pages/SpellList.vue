<template>
  <div>
    <SpellItem v-for="spell in spells" :spell="spell" :key="spell.id" />
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
      const result = await this.$cmsClient.fetchSpells();
      this.spells = result.data;
      this.pagination = result.meta.pagination;
    },
  },
});
</script>
