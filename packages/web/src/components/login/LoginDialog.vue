<template>
  <v-icon icon="mdi-login mr-4" @click="openDialog" />
  <v-dialog v-model="showDialog" transition="dialog-top-transition">
    <template #default>
      <v-card>
        <v-toolbar color="primary" title="Login"></v-toolbar>
        <v-card-text>
          <v-text-field type="email" v-model="email" label="Name" name="email"></v-text-field>
          <v-text-field type="password" v-model="password" label="Password" name="password"></v-text-field>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn variant="text" @click="showDialog = false">Close</v-btn>
          <v-btn variant="text" @click="login">Login</v-btn>
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
  }),
  methods: {
    openDialog() {
      this.showDialog = true;
    },
    login() {
      this.$cmsClient.login({
        identifier: this.email,
        password: this.password,
      });
    },
  },
});
</script>
