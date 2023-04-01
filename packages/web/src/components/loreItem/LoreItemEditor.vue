<template>
  <v-card class="mb-2">
    <template #title>
      {{ title }}
      <v-text-field label="Lore Item Name" :rules="rules.name" v-model="message.name" required />
    </template>
    <template #text>
      <div class="d-flex">
        <v-textarea class="w-50" label="Description" :rules="rules.desc" v-model="message.desc" required />
        <Markdown :source="message.desc" class="w-50 pl-4" html />
      </div>
    </template>
  </v-card>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
import { defineProps, defineEmits } from 'vue';
import { LoreItem } from '../../types/LoreItem/LoreItem';
import Markdown from 'vue3-markdown-it';
import { computed } from '@vue/reactivity';

const props = defineProps({
  modelValue: {
    type: Object as PropType<LoreItem>,
    default: () => ({}),
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const message = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const rules = {
  name: [(v: string) => !!v || 'Field cannot be empty', (v: string) => v.length > 4 || 'Field must contain more than 4 symbols'],
  desc: [(v: string) => !!v || 'Field cannot be empty', (v: string) => v.length > 4 || 'Field must contain more than 4 symbols'],
};
</script>
