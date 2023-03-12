<template>
  <v-card class="mx-auto mb-2 race-item">
    <v-card-item style="padding: 0">
      <v-img class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="100px" cover>
        <div class="d-flex align-center h-100 flex-column pt-2 pl-6">
          <div class="text-h6 mb-1 align-self-start mb-3">
            {{ campaign.name }}
          </div>
        </div>
      </v-img>
    </v-card-item>
  </v-card>
</template>
<script lang="ts">
import { CampaignListItemModel } from '@/types/Campaign/Campaign';
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    campaign: {
      type: CampaignListItemModel,
      default: () => CampaignListItemModel.getEmpty(),
    },
  },
});
</script>
<style>
.race-item .v-responsive__content {
  height: 100%;
}
</style>
