<template>
  <v-card class="w-100 mb-2 campaign-item" :to="{ name: 'QuestEpisodeCreate', params: { id: $route.params.id, questId: $route.params.questId } }">
    <v-card-item style="padding: 0">
      <v-img gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="100px" cover>
        <div class="d-flex h-100 justify-center flex-column align-center text-h5">Create Episode</div>
      </v-img>
    </v-card-item>
  </v-card>
</template>
