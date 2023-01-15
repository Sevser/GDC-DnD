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
import SpellItem from '@/components/spell/SpellItem.vue';

export default defineComponent({
  components: {
    SpellItem,
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
      return this.$store.state.spells.spellListPending;
    },
  },
});
</script>
