<template>
  <list-preview-layout title="Quest Episodes list">
    <div class="pl-2 pr-2" style="height: 100%">
      <div v-if="pending" class="d-flex justify-center align-center" style="height: 100%">
        <v-progress-circular indeterminate :size="60" />
      </div>
      <HasNoQuestEpisodes v-else-if="!episodeList.length" />
      <template v-else>
        <v-container fluid>
          <v-row dense>
            <v-col v-for="episode in episodeList" :key="episode.name" :cols="cols">
              <EpisodeListItem :episode="episode" @click="() => openEpisode(episode)" />
            </v-col>
            <v-col :cols="cols" v-if="$store.state.campaign.canEditEpisode">
              <CreateEpisode />
            </v-col>
          </v-row>
        </v-container>
      </template>
    </div>
  </list-preview-layout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ListPreviewLayout from '../../layout/ListPreviewLayout/ListPreviewLayout.vue';
import EpisodeListItem from '@/components/episodes/EpisodeListItem.vue';
import CreateEpisode from '@/components/episodes/CreateEpisode.vue';
import HasNoQuestEpisodes from '@/components/episodes/HasNoQuestEposodes.vue';
import { QuestEpisodeListItem } from '@/types/Campaign/QuestEpisode';

export default defineComponent({
  components: {
    ListPreviewLayout,
    EpisodeListItem,
    HasNoQuestEpisodes,
    CreateEpisode,
  },
  data: () => ({}),
  created() {
    const unwatch = this.$watch(
      () => this.$route.params,
      () => {
        this.$store.dispatch('campaign/fetchQuestEpisodesList', this.$route.params.questId);
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
      return this.$store.state.campaign.episodeListPending && this.episodeList.length === 0;
    },
    episodeList() {
      return this.$store.state.campaign.episodeList;
    },
  },
  methods: {
    openEpisode(episode: QuestEpisodeListItem) {
      this.$router.push({
        name: 'QuestView',
        params: {
          id: this.$route.params.id,
          questId: this.$route.params.questId,
          episodeId: episode.id,
        },
      });
    },
  },
});
</script>
