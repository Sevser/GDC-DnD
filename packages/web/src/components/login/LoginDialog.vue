<template>
  <v-icon :icon="icon" class="mr-4" @click="openDialog" />
  <v-dialog v-model="showDialog" transition="dialog-top-transition">
    <template #default>
      <v-card>
        <v-toolbar color="primary" title="Login"></v-toolbar>
        <v-card-text>
          <v-text-field type="email" v-model="email" label="Name" name="email"></v-text-field>
          <v-text-field type="password" v-model="password" label="Password" name="password"></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" :loading="loading" @click="showDialog = false">Close</v-btn>
          <v-btn variant="text" :loading="loading" @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data: () => ({
    showDialog: false,
    email: '',
    password: '',
    loading: false,
  }),
  computed: {
    icon() {
      return this.$authManager.authState.isAuth ? 'mdi-account-circle' : 'mdi-login';
    },
  },
  methods: {
    openDialog() {
      if (this.$authManager.authState.isAuth) {
        this.$router.push({
          name: 'User',
        });
      } else {
        this.showDialog = true;
      }
    },
    async login() {
      this.loading = true;
      try {
        const data = await this.$cmsClient.login({
          identifier: this.email,
          password: this.password,
        });
        this.$authManager.token = data.jwt;
        this.$authManager.user = data.user;
        this.showDialog = false;
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>
