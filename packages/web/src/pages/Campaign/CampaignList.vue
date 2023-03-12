<template>
  <list-preview-layout>
    <div class="pl-2 pr-2" style="height: 100%">
      <div v-if="pending" class="d-flex justify-center align-center" style="height: 100%">
        <v-progress-circular indeterminate :size="60" />
      </div>
      <HasNoCampaigns v-else-if="!campaignList.length" />
      <template v-else>
        <v-container fluid>
          <v-row dense>
            <v-col v-for="campaign in campaignList" :key="campaign.name" :cols="cols">
              <CampaignListItem :campaign="campaign" @click.prevent="() => handleClick(campaign)" @openModal="openModal" />
            </v-col>
            <v-col :cols="cols">
              <CreateCampaign />
            </v-col>
          </v-row>
        </v-container>
      </template>
      <v-dialog v-model="dialog">
        <v-card>
          <v-card-title>{{ currentCampaign.name }} </v-card-title>
          <v-card-text>{{ currentCampaign.desc }} </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block @click="dialog = false">Close Description</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </list-preview-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ListPreviewLayout from '../../layout/ListPreviewLayout/ListPreviewLayout.vue';
import CampaignListItem from '@/components/campaign/CampaignListItem.vue';
import HasNoCampaigns from '@/components/campaign/HasNoCampaigns.vue';
import CreateCampaign from '@/components/campaign/CreateCampaign.vue';
import { CampaignListItemModel } from '@/types/Campaign/Campaign';

export default defineComponent({
  components: {
    ListPreviewLayout,
    CampaignListItem,
    HasNoCampaigns,
    CreateCampaign,
  },
  data: () => ({
    dialog: false,
    currentCampaign: CampaignListItemModel.getEmpty(),
  }),
  created() {
    const unwatch = this.$watch(
      () => this.$route.params,
      () => {
        this.$store.dispatch('campaign/fetchCampaignList');
        this.$nextTick(() => unwatch());
      },
      { immediate: true }
    );
  },
  computed: {
    cols() {
      if (this.$vuetify.display.xs) {
        return 12;
      }
      if (this.$vuetify.display.sm || this.$vuetify.display.md) {
        return 6;
      }
      if (this.$vuetify.display.xl || this.$vuetify.display.xxl) {
        return 3;
      }
      return 4;
    },
    pending() {
      return this.$store.state.campaign.campaignListPending && this.campaignList.length === 0;
    },
    campaignList() {
      return this.$store.state.campaign.campaignList;
    },
  },
  methods: {
    openModal(campaign: CampaignListItemModel) {
      if (campaign) {
        this.dialog = true;
        this.currentCampaign = campaign;
      }
    },
    handleClick(campaign: CampaignListItemModel) {
      this.$router.push({
        name: 'CampaignView',
        params: {
          id: campaign.id,
        },
      });
    },
  },
});
</script>
