<template>
  <v-card class="mx-auto mb-2 campaign-item">
    <v-card-item style="padding: 0">
      <v-img class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="100px" cover>
        <div class="d-flex h-100 flex-column pt-2 pl-6">
          <div class="text-h6 mb-1 align-self-start mb-3">
            {{ campaign.name }}
          </div>
          <div class="content">
            {{ campaign.tabDesc }}
          </div>
          <div class="text-subtitle-1" style="text-transform: uppercase; text-decoration: underline" @click.prevent.stop="$emit('openModal', campaign)">MORE</div>
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
.campaign-item .v-responsive__content {
  height: 100%;
}

.campaign-item .content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
