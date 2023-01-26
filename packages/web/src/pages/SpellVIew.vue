<template>
  <div>{{ spell }}</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  created() {
    const unwatch = this.$watch(
      () => this.$route.params,
      () => {
        this.$store.dispatch('spells/fetchSpell', this.$route.params.id);
        this.$nextTick(() => unwatch());
      },
      { immediate: true }
    );
  },
  computed: {
    spell() {
      return this.$store.state.spells.spell;
    },
  },
});
</script>
