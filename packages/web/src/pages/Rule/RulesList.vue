<template>
  <default-layout>
    <div class="pl-2 pr-2" style="height: 100%">
      <div v-if="pending" class="d-flex justify-center align-center" style="height: 100%">
        <v-progress-circular indeterminate :size="60" />
      </div>
      <template v-else>
        <v-container fluid>
          <v-row dense>
            <v-col v-for="rule in rules" :key="rule.index" :cols="cols">
              <v-card :title="rule.name" class="mb-4" @click="() => handleClickDictionary(rule)" />
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
import { IRuleListItem } from '@/types/Rule/Rule';

export default defineComponent({
  components: {
    DefaultLayout,
  },
  created() {
    const unwatch = this.$watch(
      () => this.$route.params,
      () => {
        this.$store.dispatch('rules/fetchRuleList');
        this.$nextTick(() => unwatch());
      },
      { immediate: true }
    );
  },
  computed: {
    cols() {
      if (this.$vuetify.display.xs) {
        return 12;
      }
      if (this.$vuetify.display.sm) {
        return 6;
      }
      return 4;
    },
    rules() {
      return this.$store.state.rules.ruleList;
    },
    pending() {
      return this.$store.state.rules.ruleListPending && this.rules.length === 0;
    },
  },
  methods: {
    handleClickDictionary(rule: IRuleListItem) {
      this.$store.commit('rules/updateCurrentRule', rule);
      this.$router.push({ name: 'RulesView', params: { id: rule.id } });
    },
  },
});
</script>
>
