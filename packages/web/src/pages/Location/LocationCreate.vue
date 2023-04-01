<template>
  <DefaultLayout title="Location create">
    <v-form class="d-flex flex-column mx-4 mt-4" ref="form">
      <v-text-field label="Name" :rules="rules.name" v-model="location.name" required />
      <v-text-field label="Index" :rules="rules.index" v-model="location.index" required />
      <v-textarea label="Tab description" :rules="rules.tabDesc" v-model="location.tabDesc" required />
      <LoreItemEditor v-model="location.shortDescription" title="Description" />
      <div class="d-flex justify-end">
        <v-btn class="mr-2" color="success" @click="create"> Create </v-btn>
        <v-btn :to="{ name: 'CampaignLocationList', params: { id: $route.params.id } }"> Cancel </v-btn>
      </div>
    </v-form>
  </DefaultLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DefaultLayout from '@/layout/default/DefaultLayout.vue';
import { LocationModel } from '@/types/Location/LocationModel';
import LoreItemEditor from '@/components/loreItem/LoreItemEditor.vue';

export default defineComponent({
  components: {
    DefaultLayout,
    LoreItemEditor,
  },
  data: () => ({
    location: LocationModel.getEmpty(),
    rules: {
      name: [(v: string) => !!v || 'Field cannot be empty', (v: string) => v.length > 4 || 'Field must contain more than 4 symbols'],
      index: [(v: string) => !!v || 'Field cannot be empty', (v: string) => v.length > 4 || 'Field must contain more than 4 symbols'],
      tabDesc: [(v: string) => !!v || 'Field cannot be empty', (v: string) => v.length > 4 || 'Field must contain more than 4 symbols'],
      desc: [(v: string) => !!v || 'Field cannot be empty', (v: string) => v.length > 4 || 'Field must contain more than 4 symbols'],
    },
  }),
  methods: {
    async create() {
      const valid = await this.validate();
      if (valid) {
        await this.$store.dispatch('campaign/createQuest', { location: this.location, campaignId: this.$route.params.id });
        this.$router.push({ name: 'CampaignView', params: { id: this.$route.params.id } });
      }
    },
    async validate() {
      const { valid } = await (this.$refs.form as { validate: () => { valid: boolean } }).validate();
      return valid;
    },
  },
});
</script>
