<template>
  <TabsPreviewLayout title="Quest Episodes list">
    <div class="pl-2 pr-2" style="height: 100%">
      <div v-if="pending" class="d-flex justify-center align-center" style="height: 100%">
        <v-progress-circular indeterminate :size="60" />
      </div>
      <template v-else>
        <v-container fluid>
          <v-row dense>
            <CreateEpisode />
          </v-row>
        </v-container>
      </template>
    </div>
  </TabsPreviewLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TabsPreviewLayout from '@/layout/TabsPreviewLayout/TabsPreviewLayout.vue';
import CreateEpisode from '@/components/quest/episodes/CreateEpisode.vue';

export default defineComponent({
  components: {
    TabsPreviewLayout,
    CreateEpisode,
  },
  data: () => ({}),
  created() {
    const unwatch = this.$watch(
      () => this.$route.params,
      () => {
        console.log(this.$route.params.questId);
        //this.$store.dispatch('campaign/fetchQuestEposodesList', this.$route.params.questId);
        this.$nextTick(() => unwatch());
      },
      { immediate: true }
    );
  },
  computed: {
    pending() {
      return false;
    },
  },
});
</script>
