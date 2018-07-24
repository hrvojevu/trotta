<template>
  <v-container fluid>
    <v-card>
      <v-card-text>
        <generation-datatable
          :generations="generations"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>


<script>
import { mapState } from 'vuex';

import GenerationDatatable from './generation-datatable';

export default {
  async fetch({ app, store }) {
    const generations = await app.$axios.$get('/generations?pools=true');

    store.commit('generation/set', generations);
  },
  components: {
    GenerationDatatable,
  },
  computed: {
    ...mapState('generation', ['generations']),
  },
};
</script>
