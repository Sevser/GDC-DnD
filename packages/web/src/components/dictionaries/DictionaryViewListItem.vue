<template>
  <v-card :title="dictionaryListItem?.name" :text="dictionaryListItem?.desc" class="mb-4"> </v-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { AllowedDictionaryClasses } from '@/types/Dictionaries/CanBeDictionary';

export default defineComponent({
  props: {
    dictionaryListItem: Object as PropType<AllowedDictionaryClasses>,
  },
});
</script>
