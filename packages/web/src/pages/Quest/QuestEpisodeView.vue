<template>
  <TabsPreviewLayout title="Quest Episodes Event list">
    <div class="pl-2 pr-2" style="height: 100%">
      <div v-if="pending" class="d-flex justify-center align-center" style="height: 100%">
        <v-progress-circular indeterminate :size="60" />
      </div>
      <template v-else>
        <v-container fluid>
          <v-row dense>
            <v-col v-for="event in eventList" :key="event.name + event.id" cols="12">
              <EventListItem :event="event" @click="() => openEvent(event)" />
            </v-col>
            <v-col cols="12">
              <CreateEvent @click="createEpisode" />
            </v-col>
          </v-row>
        </v-container>
      </template>
    </div>
  </TabsPreviewLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TabsPreviewLayout from '@/layout/TabsPreviewLayout/TabsPreviewLayout.vue';
import CreateEvent from '@/components/episodeEvent/CreateEvent.vue';
import EventListItem from '@/components/episodeEvent/EventListItem.vue';
import { QuestEventListItem } from '@/types/Campaign/QuestEvent';

export default defineComponent({
  components: {
    TabsPreviewLayout,
    EventListItem,
    CreateEvent,
  },
  data: () => ({}),
  created() {
    const unwatch = this.$watch(
      () => this.$route.params,
      () => {
        this.$store.dispatch('campaign/fetchQuestEventsList', this.$route.params.episodeId);
        this.$nextTick(() => unwatch());
      },
      { immediate: true }
    );
  },
  computed: {
    pending() {
      return this.$store.state.campaign.eventListPending && this.eventList.length === 0;
    },
    eventList() {
      return this.$store.state.campaign.eventList;
    },
  },
  methods: {
    openEvent(event: QuestEventListItem) {
      console.log(event);
    },
    async createEpisode() {
      await this.$store.dispatch('campaign/createQuestEvent', { event: QuestEventListItem, episodeId: this.$route.params.episodeId });
      this.$store.dispatch('campaign/fetchQuestEventsList', this.$route.params.episodeId);
    },
  },
  mounted() {
    if (this.$vuetify.display.mdAndUp) {
      this.$router.push({
        name: 'ViewQuestGeneralInfo',
      });
    }
  },
});
</script>
