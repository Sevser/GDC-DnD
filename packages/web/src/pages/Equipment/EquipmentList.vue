<template>
  <list-preview-layout>
    <div class="pl-2 pr-2" style="height: 100%">
      <div v-if="pending" class="d-flex justify-center align-center" style="height: 100%">
        <v-progress-circular indeterminate :size="60" />
      </div>
      <template v-else>
        <EquipmentListItem v-for="eq in equipment" :key="eq.index" :equipment="eq" @click="handleClick(eq)" />
      </template>
      <div class="d-flex justify-center align-center" style="height: 20px" v-if="showLoader">
        <InfiniteLoading @infinite="loadNextPage" />
      </div>
      <div v-if="hasNoEquipment" class="d-flex flex-column p-4 justify-center align-center h-100">
        <div class="text-h4 mb-4">Фильтры слишком жесткие</div>
        <v-btn prepend-icon="mdi-restore" color="secondary" @click="resetFilters"> сбросить фильтры </v-btn>
      </div>
    </div>
  </list-preview-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ListPreviewLayout from '../../layout/ListPreviewLayout/ListPreviewLayout.vue';
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';
import EquipmentListItem from '@/components/equipment/EquipmentListItem.vue';
import { Pagination } from '@/types/Pagination';
import { IEquipmentListItemModel } from '@/types/Equipment/EquipmentListItemModel';

export default defineComponent({
  components: {
    ListPreviewLayout,
    InfiniteLoading,
    EquipmentListItem,
  },
  data: () => ({}),
  created() {
    const unwatch = this.$watch(
      () => this.$route.params,
      () => {
        this.$store.dispatch('equipment/fetchEquipmentList');
        this.$nextTick(() => unwatch());
      },
      { immediate: true }
    );
  },
  computed: {
    hasNoEquipment() {
      return this.$store.state.equipment?.pagination?.total === 0;
    },
    showLoader() {
      if (this.$store.state.spells.pagination.total) {
        return this.equipment.length > 0 && this.$store.state.spells.pagination.total > this.equipment.length;
      }
      return this.equipment.length > 0;
    },
    pending() {
      return this.$store.state.equipment.equipmentListPending && this.equipment.length === 0;
    },
    equipment() {
      return this.$store.state.equipment.equipmentList;
    },
  },
  methods: {
    handleClick(equipment: IEquipmentListItemModel) {
      this.$router.push({
        name: 'EquipmentView',
        params: {
          id: equipment.id,
        },
      });
    },
    resetFilters() {
      this.$store.commit('equipment/setCurrentFilters', {});
      this.$store.dispatch('equipment/fetchSpellList', {});
    },
    loadNextPage() {
      if ((this.$store.state.equipment.pagination as Pagination).hasNextPage && !this.pending) {
        this.$store.dispatch('equipment/fetchMoreEquipmentList', {
          pagination: (this.$store.state.equipment.pagination as Pagination).nextPage,
        });
      }
    },
  },
});
</script>
