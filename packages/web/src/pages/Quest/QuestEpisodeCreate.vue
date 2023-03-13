<template>
  <DefaultLayout title="Quest create">
    <v-form class="d-flex flex-column mx-4 mt-4" ref="form">
      <v-text-field label="Name" :rules="rules.name" v-model="questEpisode.name" required />
      <v-text-field label="Index" :rules="rules.index" v-model="questEpisode.index" required />
      <div class="d-flex justify-end">
        <v-btn class="mr-2" color="success" @click="create"> Create </v-btn>
        <v-btn :to="{ name: 'QuestEpisodeList', params: { id: $route.params.id, questId: $route.params.questId } }"> Cancel </v-btn>
      </div>
    </v-form>
  </DefaultLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import DefaultLayout from '@/layout/default/DefaultLayout.vue';
import { QuestEpisodeListItem } from '@/types/Campaign/QuestEpisode';

export default defineComponent({
  components: {
    DefaultLayout,
  },
  data: () => ({
    questEpisode: QuestEpisodeListItem.getEmpty(),
    rules: {
      name: [(v: string) => !!v || 'Field cannot be empty', (v: string) => v.length > 4 || 'Field must contain more than 4 symbols'],
      index: [(v: string) => !!v || 'Field cannot be empty', (v: string) => v.length > 4 || 'Field must contain more than 4 symbols'],
    },
  }),
  methods: {
    async create() {
      const valid = await this.validate();
      if (valid) {
        await this.$store.dispatch('campaign/createQuestEpisode', { questEpisode: this.questEpisode, questId: this.$route.params.questId });
        this.$router.push({ name: 'QuestEpisodeList', params: { id: this.$route.params.id, questId: this.$route.params.questId } });
      }
    },
    async validate() {
      const { valid } = await (this.$refs.form as { validate: () => { valid: boolean } }).validate();
      return valid;
    },
  },
});
</script>
