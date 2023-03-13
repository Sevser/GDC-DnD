<template>
  <div class="d-flex flex-column p-4 justify-center align-center h-100">
    Oops... It looks like you don't have any quests yet.
    <v-btn variant="text" :to="{ name: 'CreateQuest', params: { id: $route.params.id } }">Create quest</v-btn>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
