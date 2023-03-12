<template>
  <DefaultLayout>
    <v-form class="d-flex flex-column mx-4 mt-4" ref="form">
      <v-text-field label="Name" :rules="rules.name" v-model="campaign.name" required />
      <v-text-field label="Index" :rules="rules.index" v-model="campaign.index" required />
      <v-textarea label="Description" :rules="rules.desc" v-model="campaign.desc" required />
      <div class="d-flex justify-end">
        <v-btn class="mr-2" color="success" @click="create"> Create </v-btn>
        <v-btn :to="{ name: 'CampaignList' }"> Cancel </v-btn>
      </div>
    </v-form>
  </DefaultLayout>
</template>
<script>
import { defineComponent } from 'vue';
import DefaultLayout from '@/layout/default/DefaultLayout.vue';
import { CampaignListItemModel } from '@/types/Campaign/Campaign.ts';

export default defineComponent({
  components: {
    DefaultLayout,
  },
  data: () => ({
    campaign: CampaignListItemModel.getEmpty(),
    rules: {
      name: [(v) => !!v || 'Field cannot be empty', (v) => v.length > 4 || 'Field must contain more than 4 symbols'],
      index: [(v) => !!v || 'Field cannot be empty', (v) => v.length > 4 || 'Field must contain more than 4 symbols'],
      desc: [(v) => !!v || 'Field cannot be empty', (v) => v.length > 4 || 'Field must contain more than 4 symbols'],
    },
  }),
  methods: {
    async create() {
      const valid = await this.validate();
      if (valid) {
        await this.$store.dispatch('campaign/createCampaign', this.campaign);
        console.log(this.campaign);
      }
    },
    async validate() {
      const { valid } = await this.$refs.form.validate();
      return valid;
    },
  },
});
</script>
