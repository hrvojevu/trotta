<template>
  <v-container fluid>
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
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>


<script>
import { isAfter, isBefore, getYear } from 'date-fns';
import { uniq } from 'lodash';

import SpawnDatatable from './spawn-datatable';

export default {
  async asyncData({ app }) {
    // Data prop is spread so it's properties can be sorted by in the datatable.
    const generations = (await app.$axios.$get('/generations')).map((g) => ({ ...g, ...g.data }));
    const spawnYears = uniq(generations.map((g) => getYear(g.spawnDate)));

    return { generations, spawnYears };
  },
  components: {
    SpawnDatatable,
  },
  data() {
    return {
      selectedYear: null,
    };
  },
  computed: {
    selectedGenerations() {
      return this.selectedYear ?
        this.generations.filter((g) => isAfter(new Date(g.spawnDate), new Date(this.selectedYear, 0)) &&
        isBefore(new Date(g.spawnDate), new Date(this.selectedYear + 1, 0))) : this.generations;
    },
  },
};
</script>
