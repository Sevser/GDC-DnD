<template>
  <v-card class="mx-auto mb-2">
    <template #text>
      <div class="d-flex align-center">
        <v-btn variant="outlined" color="primary" rounded="pill" size="small" class="mr-2">
          {{ transformRating(beast.challenge_rating) }}
        </v-btn>
        <div class="text-h6 mb-1">
          {{ beast.name }}
        </div>
      </div>
      <div class="pl-4 pr-4">{{ beast.type }} | {{ beast.Size.Size }} | {{ beast.alignment.alignment }}</div>
    </template>
  </v-card>
</template>
<script lang="ts">
import { BeastListItem, IBeastListItem } from '@/types/beasts/BeastListItem';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    beast: {
      type: BeastListItem,
      default: () => new BeastListItem({} as IBeastListItem),
    },
  },
  methods: {
    transformRating(rating: number) {
      if (rating === 0.125) {
        return '1/8';
      }
      if (rating === 0.25) {
        return '1/4';
      }
      if (rating === 0.5) {
        return '1/2';
      }
      return rating;
    },
  },
});
</script>
