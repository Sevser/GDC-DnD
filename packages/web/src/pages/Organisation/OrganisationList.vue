<template>
  <div class="pl-2 pr-2" style="height: 100%">
    <div v-if="pending" class="d-flex justify-center align-center" style="height: 100%">
      <v-progress-circular indeterminate :size="60" />
    </div>
    <HasNoQuests v-else-if="!questList.length" />
    <template v-else>
      <v-container fluid>
        <v-row dense>
          <v-col v-for="quest in questList" :key="quest.name" :cols="cols">
            <QuestListItem :quest="quest" @openModal="openModal" @click="() => openQuest(quest)" />
          </v-col>
          <v-col :cols="cols" v-if="$store.state.campaign.canEditCampaign">
            <CreateQuest />
          </v-col>
        </v-row>
      </v-container>
    </template>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>{{ currentQuest.name }} </v-card-title>
        <v-card-text> <Markdown :source="currentQuest.desc" /> </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close Description</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import Markdown from 'vue3-markdown-it';
import QuestListItem from '@/components/quest/QuestListItem.vue';
import CreateQuest from '@/components/quest/CreateQuest.vue';
import HasNoQuests from '@/components/quest/HasNoQuests.vue';
import { QuestListItemModel } from '@/types/Campaign/Quest';

export default defineComponent({
  components: {
    QuestListItem,
    HasNoQuests,
    Markdown,
    CreateQuest,
  },
  data: () => ({
    dialog: false,
    currentQuest: QuestListItemModel.getEmpty(),
  }),
  created() {
    const unwatch = this.$watch(
      () => this.$route.params,
      () => {
        this.$store.dispatch('campaign/fetchQuestList', this.$route.params.id);
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
      return this.$store.state.campaign.questListPending && this.questList.length === 0;
    },
    questList() {
      return this.$store.state.campaign.questList;
    },
  },
  methods: {
    openQuest(quest: QuestListItemModel) {
      this.$router.push({
        name: 'QuestEpisodeList',
        params: {
          id: this.$route.params.id,
          questId: quest.id,
        },
      });
    },
    openModal(quest: QuestListItemModel) {
      if (quest) {
        this.dialog = true;
        this.currentQuest = quest;
      }
    },
  },
});
</script>
