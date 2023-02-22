<template>
  <list-preview-layout>
    <div class="pl-2 pr-2" style="height: 100%">
      <div v-if="pending" class="d-flex justify-center align-center" style="height: 100%">
        <v-progress-circular indeterminate :size="60" />
      </div>
      <template v-else>
        <ArmorListItem v-for="armor in armorList" :key="armor.index" :armor="armor" @click="handleClick(armor)" />
      </template>
    </div>
  </list-preview-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ListPreviewLayout from '../layout/ListPreviewLayout/ListPreviewLayout.vue';
import { IArmorModel } from '@/types/Armor/Armor';
import ArmorListItem from '@/components/equipment/ArmorListItem.vue';

export default defineComponent({
  components: {
    ListPreviewLayout,
    ArmorListItem,
  },
  data: () => ({}),
  created() {
    const unwatch = this.$watch(
      () => this.$route.params,
      () => {
        this.$store.dispatch('equipment/fetchArmorList');
        this.$nextTick(() => unwatch());
      },
      { immediate: true }
    );
  },
  computed: {
    pending() {
      return this.$store.state.equipment.armorListPending && this.armorList.length === 0;
    },
    armorList() {
      return this.$store.state.equipment.armorList;
    },
  },
  methods: {
    handleClick(armor: IArmorModel) {
      this.$router.push({
        name: 'ArmorView',
        params: {
          id: armor.id,
        },
      });
    },
  },
});
</script>
