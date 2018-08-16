<template>
  <v-container fluid>
    <v-btn
      @click="dialog=true"
      fab
      color="primary"
    >
      <v-icon dark>add</v-icon>
    </v-btn>
    <generation-create-edit-dialog
      v-if="dialog"
      :dialog="dialog"
      :generation-prop="generationToEdit"
      @close="closeDialog"
    />
    <v-card>
      <v-card-text>
        <v-flex xs2>
          <v-select
            v-model="selectedYear"
            :items="spawnYears"
            label="Godina"
          />
        </v-flex>
        <spawn-datatable
          :generations="selectedGenerations"
          @editGeneration="editGeneration($event)"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { isAfter, isBefore, getYear } from 'date-fns';
import { uniq } from 'lodash';
import { mapState } from 'vuex';

import GenerationCreateEditDialog from './generation-create-edit-dialog';
import SpawnDatatable from './spawn-datatable';

export default {
  async fetch({ app, store }) {
    const generations = await app.$axios.$get('/generations');

    store.commit('generation/set', generations);
  },
  components: {
    GenerationCreateEditDialog,
    SpawnDatatable,
  },
  data() {
    return {
      dialog: false,
      generationToEdit: undefined,
      selectedYear: undefined,
    };
  },
  computed: {
    ...mapState('generation', ['generations']),
    spawnYears() {
      return uniq(this.generations.map((g) => getYear(g.spawnDate)));
    },
    selectedGenerations() {
      // Data prop is spread so it's properties can be sorted by in the datatable.
      const generations = this.generations.map((g) => ({ ...g, ...g.data }));

      return this.selectedYear ?
        generations.filter((g) => isAfter(new Date(g.spawnDate), new Date(this.selectedYear, 0)) &&
        isBefore(new Date(g.spawnDate), new Date(this.selectedYear + 1, 0))) : generations;
    },
  },
  methods: {
    editGeneration(generation) {
      this.generationToEdit = generation;
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.generationToEdit = undefined;
    },
  },
};
</script>
