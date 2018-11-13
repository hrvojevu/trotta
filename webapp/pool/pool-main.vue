<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex class="mb-4" xs12>
        <v-btn
          v-for="pool in pools"
          :key="pool.id"
          :to="{ path: `/bazeni/${pool.type.code}/${pool.id}` }"
          small
        >
          {{ pool.name }}
        </v-btn>
      </v-flex>
      <v-flex xs12>
        <v-btn
          @click="isPoolDialogShown = true"
          fab
          color="primary"
        >
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-flex>
      <v-flex v-if="!$route.params.id" xs12>
        <v-card>
          <v-card-text>
            <pool-datatable
              :pools="pools"
            />
          </v-card-text>
        </v-card>
      </v-flex>
      <router-view/>
    </v-layout>
    <pool-create-edit-dialog
      v-if="isPoolDialogShown"
      :dialog="isPoolDialogShown"
      @close="isPoolDialogShown = false"
    />
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

import PoolCreateEditDialog from './pool-create-edit-dialog';
import PoolDatatable from './pool-datatable';

export default {
  components: {
    PoolCreateEditDialog,
    PoolDatatable,
  },
  async fetch({ app, store }) {
    const pools = await app.$axios.$get('/pools');
    const types = await app.$axios.$get('/pools/types');

    store.commit('pool/set', pools);
    store.commit('pool/setTypes', types);
  },
  data() {
    return {
      isPoolDialogShown: false,
    };
  },
  computed: {
    ...mapGetters('pool', ['poolsByType']),
    pools() {
      return this.poolsByType.get(this.$route.params.type);
    },
  },
};
</script>
