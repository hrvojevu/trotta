<template>
  <v-container fluid>
    <v-btn
      @click="showDialog"
      class="ml-0"
      color="error"
      outline
      small
    >
      mortalitet
      <v-icon class="pl-2">add</v-icon>
    </v-btn>

    <v-card>
      <v-card-text>
        <mortality-datatable :mortalities="mortalities" />
      </v-card-text>
    </v-card>

    <mortality-dialog
      v-if="isDialogShown"
      :dialog="isDialogShown"
      :pools="poolsWithGeneration"
      @close="closeDialog"
      @submit="submitMortality"
    />
  </v-container>
</template>

<script>
import { sortBy } from 'lodash';
import { mapState, mapActions } from 'vuex';

import MortalityDatatable from './mortality-datatable';
import MortalityDialog from './mortality-dialog';

export default {
  async fetch({ app, store }) {
    const pools = await app.$axios.$get('/pools');
    const mortalities = await app.$axios.$get('/mortality');

    store.commit('pool/set', pools);
    store.commit('mortality/set', mortalities);
  },
  components: {
    MortalityDatatable,
    MortalityDialog,
  },
  data() {
    return {
      isDialogShown: false,
    };
  },
  computed: {
    ...mapState('pool', ['pools']),
    ...mapState('mortality', ['mortalities']),
    poolsWithGeneration() {
      return sortBy(this.pools.filter((p) => p.generations.length), 'spawnDate');
    },
  },
  methods: {
    ...mapActions('mortality', { mortalityCreate: 'create' }),
    showDialog() {
      this.isDialogShown = true;
    },
    closeDialog() {
      this.isDialogShown = false;
    },
    submitMortality(mortalityInfo) {
      this.isDialogShown = false;
      this.mortalityCreate(mortalityInfo);
    },
  },
};
</script>
