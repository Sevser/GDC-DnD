<template>
  <v-card class="mx-auto mb-2">
    <template #title>{{ spell.title }}</template>

    <template #text>
      <v-banner :lines="lines" :text="spell.description" class="pb-1" :border="0"></v-banner>
      <CollapseToggle :value="collapsed" @toggle="toggle" class="collapse-toggle" />
    </template>
  </v-card>
</template>
<script lang="ts">
import { Spell } from '@/types/Spell';
import { defineComponent } from 'vue';
import CollapseToggle from '../base/collapse/CollapseToggle.vue';

export default defineComponent({
  props: {
    spell: {
      type: Spell,
      required: true,
    },
  },
  components: {
    CollapseToggle,
  },
  data: () => ({
    collapsed: false,
  }),
  methods: {
    toggle(e: boolean) {
      this.collapsed = e;
    },
  },
  computed: {
    lines() {
      return this.collapsed ? undefined : 'two';
    },
  },
});
</script>
<style scoped>
.collapse-toggle {
  position: absolute;
  bottom: 0.5rem;
  right: 1rem;
}
</style>
