<template>
  <v-dialog :model-value="open" @update:modelValue="handleUpdateValue" max-width="600">
    <v-card>
      <v-card-title>
        <span class="text-h5">Sort by</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-select label="sort" :items="sortFields" :model-value="current" @update:modelValue="updateCurrent"></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="handleUpdateValue(false)"> Reset </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="handleUpdateValue(false)"> Apply </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Sorting } from '@/types/Sorting';

interface AdditionalMenuSortData {
  dialog: boolean;
  current: string | undefined;
}

export default defineComponent({
  data: (): AdditionalMenuSortData => ({
    dialog: false,
    current: undefined,
  }),
  props: {
    open: {
      type: Boolean,
    },
  },
  computed: {
    sortFields() {
      return this.$store.state.bestiary.sort.available.map((sort: Sorting) => sort.forParams.sort);
    },
  },
  mounted() {
    if (this.$store.state.bestiary.sort.current) {
      this.current = this.$store.state.bestiary.sort.current.forParams.sort;
    }
  },
  methods: {
    handleUpdateValue(val: boolean) {
      if (!val) {
        this.$emit('close');
        if (this.$store.state.bestiary.sort.current) {
          this.$store.dispatch('bestiary/fetchBeastList', { ...this.$store.state.bestiary.sort.current.forParams });
        }
        if (this.$router.currentRoute.value.name === 'BestiaryView') {
          this.$router.push({
            name: 'BestiaryList',
          });
        }
      }
    },
    updateCurrent(newValue: string) {
      this.current = newValue;
      this.$store.commit('bestiary/setCurrentSorting', newValue);
    },
  },
});
</script>
