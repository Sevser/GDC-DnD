<template>
  <list-preview-layout>
    <div class="pl-2 pr-2" style="height: 100%">
      <div v-if="pending" class="d-flex justify-center align-center" style="height: 100%">
        <v-progress-circular indeterminate :size="60" />
      </div>
      <template v-else>
        <WeaponListItem v-for="weapon in weaponList" :key="weapon.index" :weapon="weapon" @click="handleClick(weapon)" />
      </template>
    </div>
  </list-preview-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ListPreviewLayout from '../layout/ListPreviewLayout/ListPreviewLayout.vue';
import WeaponListItem from '@/components/equipment/WeaponListItem.vue';
import { IWeaponModel } from '@/types/Weapon/Weapon';

export default defineComponent({
  components: {
    ListPreviewLayout,
    WeaponListItem,
  },
  data: () => ({}),
  created() {
    const unwatch = this.$watch(
      () => this.$route.params,
      () => {
        this.$store.dispatch('equipment/fetchWeaponList');
        this.$nextTick(() => unwatch());
      },
      { immediate: true }
    );
  },
  computed: {
    pending() {
      return this.$store.state.equipment.weaponListPending && this.weaponList.length === 0;
    },
    weaponList() {
      return this.$store.state.equipment.weaponList;
    },
  },
  methods: {
    handleClick(armor: IWeaponModel) {
      this.$router.push({
        name: 'WeaponView',
        params: {
          id: armor.id,
        },
      });
    },
  },
});
</script>
