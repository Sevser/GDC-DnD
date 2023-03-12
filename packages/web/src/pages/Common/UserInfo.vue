<template>
  <DefaultLayout>
    <div class="d-flex flex-column mx-4 mt-4">
      <v-text-field label="user name" disabled v-model="userName" class="mb-2" />
      <v-text-field label="email" disabled v-model="email" class="mb-2" />
      <v-btn @click="logoff"> logoff </v-btn>
    </div>
  </DefaultLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DefaultLayout from '@/layout/default/DefaultLayout.vue';

export default defineComponent({
  components: {
    DefaultLayout,
  },
  computed: {
    userName() {
      console.log(this.$authManager.user.username);
      return this.$authManager.authState.isAuth && this.$authManager.user.username;
    },
    email() {
      return this.$authManager.authState.isAuth && this.$authManager.user.email;
    },
  },
  methods: {
    logoff() {
      this.$authManager.logoff();
    },
  },
});
</script>
