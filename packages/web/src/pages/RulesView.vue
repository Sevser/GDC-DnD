<template>
  <default-layout :title="title">
    <div class="pl-2 pr-2 pt-4" style="height: 100%">
      <div v-if="pending" class="d-flex justify-center align-center" style="height: 100%">
        <v-progress-circular indeterminate :size="60" />
      </div>
      <template v-else>
        <v-row class="h-100 w-100">
          <v-col :cols="$vuetify.display.xs ? 0 : 3" class="d-none d-sm-flex flex-column align-center pt-6 h-100">
            <RuleNavigationItem v-for="section in rule?.ruleSections" :key="section.index" :section="section" />
          </v-col>
          <v-col :cols="$vuetify.display.xs ? 12 : 9" class="d-flex flex-column h-100 overflow-y-auto pt-6" ref="ruleContainer">
            <div>
              <RuleContent v-for="section in rule?.ruleSections" :key="section.index" :section="section" />
            </div>
          </v-col>
        </v-row>
      </template>
    </div>
  </default-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DefaultLayout from '@/layout/default/DefaultLayout.vue';
import RuleNavigationItem from '@/components/rules/RuleNavigationItem.vue';
import RuleContent from '@/components/rules/RuleContent.vue';

export default defineComponent({
  components: {
    DefaultLayout,
    RuleNavigationItem,
    RuleContent,
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
