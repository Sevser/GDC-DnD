<template>
  <TabsPreviewLayout title="" />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TabsPreviewLayout from '@/layout/TabsPreviewLayout/TabsPreviewLayout.vue';

export default defineComponent({
  components: {
    TabsPreviewLayout,
  },
  mounted() {
    if (this.$vuetify.display.mdAndUp && this.$router.currentRoute.value.name === 'CampaignView') {
      this.$router.push({
        name: 'CampaignQuestList',
      });
    }
  },
});
</script>
