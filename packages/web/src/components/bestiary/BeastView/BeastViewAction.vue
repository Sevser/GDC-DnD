<template>
  <div class="d-flex flex-column">
    <div class="text-subtitle-2">{{ action.name }}</div>
    <div class="text-body-2">{{ action.desc }}</div>
  </div>
</template>
<script lang="ts">
import { Actions } from '@/types/Actions/Actions';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    action: {
      type: Actions,
      default: Actions.getEmpty(),
    },
  },
});
</script>
