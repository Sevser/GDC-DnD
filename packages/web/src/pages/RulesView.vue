<template>
  <default-layout :title="title">
    <div class="pl-2 pr-2" style="height: 100%">
      <div v-if="false" class="d-flex justify-center align-center" style="height: 100%">
        <v-progress-circular indeterminate :size="60" />
      </div>
      <template v-else> {{ rule }} </template>
    </div>
  </default-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DefaultLayout from '@/layout/default/DefaultLayout.vue';

export default defineComponent({
  components: {
    DefaultLayout,
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (newValue, oldValue) => {
        if (!oldValue || newValue.id !== oldValue.id) {
          this.$store.dispatch('rules/fetchRule', this.$route.params.id);
        }
      },
      { immediate: true }
    );
  },
  computed: {
    title() {
      return this.$store.state.rules.currentRuleView?.name;
    },
    rule() {
      return this.$store.state.rules.currentRuleView;
    },
    pending() {
      return this.$store.state.rules.currentRuleViewPending && this.rule === undefined;
    },
  },
  beforeUnmount() {
    this.$store.commit('rules/updateRuleView');
  },
});
</script>
