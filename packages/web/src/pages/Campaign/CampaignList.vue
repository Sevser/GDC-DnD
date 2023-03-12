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
              <CampaignListItem :campaign="campaign" />
            </v-col>
          </v-row>
        </v-container>
      </template>
    </div>
  </list-preview-layout>
</template>
<script>
import { defineComponent } from 'vue';
import ListPreviewLayout from '../../layout/ListPreviewLayout/ListPreviewLayout.vue';
import CampaignListItem from '@/components/campaign/CampaignListItem.vue';
import HasNoCampaigns from '@/components/campaign/HasNoCampaigns.vue';

export default defineComponent({
  components: {
    ListPreviewLayout,
    CampaignListItem,
    HasNoCampaigns,
  },
  data: () => ({}),
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
  methods: {},
});
</script>
