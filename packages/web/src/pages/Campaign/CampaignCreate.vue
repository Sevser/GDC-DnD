<template>
  <DefaultLayout title="Campaign create">
    <v-form class="d-flex flex-column mx-4 mt-4" ref="form">
      <v-text-field label="Name" :rules="rules.name" v-model="campaign.name" required />
      <v-text-field label="Index" :rules="rules.index" v-model="campaign.index" required />
      <v-textarea label="Tab description" :rules="rules.tabDesc" v-model="campaign.tabDesc" required />
      <div class="d-flex">
        <v-textarea class="w-50" label="Description" :rules="rules.desc" v-model="campaign.desc" required />
        <Markdown :source="campaign.desc" class="w-50 pl-4" html />
      </div>
      <div class="d-flex justify-end">
        <v-btn class="mr-2" color="success" @click="create"> Create </v-btn>
        <v-btn :to="{ name: 'CampaignList' }"> Cancel </v-btn>
      </div>
    </v-form>
  </DefaultLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DefaultLayout from '@/layout/default/DefaultLayout.vue';
import { CampaignListItemModel } from '@/types/Campaign/Campaign';
import Markdown from 'vue3-markdown-it';

export default defineComponent({
  components: {
    DefaultLayout,
    Markdown,
  },
  data: () => ({
    campaign: CampaignListItemModel.getEmpty(),
    rules: {
      name: [(v: string) => !!v || 'Field cannot be empty', (v: string) => v.length > 4 || 'Field must contain more than 4 symbols'],
      index: [(v: string) => !!v || 'Field cannot be empty', (v: string) => v.length > 4 || 'Field must contain more than 4 symbols'],
      desc: [(v: string) => !!v || 'Field cannot be empty', (v: string) => v.length > 4 || 'Field must contain more than 4 symbols'],
      tabDesc: [(v: string) => !!v || 'Field cannot be empty', (v: string) => v.length > 4 || 'Field must contain more than 4 symbols'],
    },
  }),
  methods: {
    async create() {
      const valid = await this.validate();
      if (valid) {
        await this.$store.dispatch('campaign/createCampaign', this.campaign);
        this.$router.push({ name: 'CampaignList' });
      }
    },
    async validate() {
      const { valid } = await (this.$refs.form as { validate: () => { valid: boolean } }).validate();
      return valid;
    },
  },
});
</script>
