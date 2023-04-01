<template>
  <v-card class="mx-auto mb-2 campaign-item" :to="{ name: 'CreateOrganisation', params: { id: $route.params.id } }">
    <v-card-item style="padding: 0">
      <v-img gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="100px" cover>
        <div class="d-flex h-100 justify-center flex-column align-center text-h5">Create Organisation</div>
      </v-img>
    </v-card-item>
  </v-card>
</template>
