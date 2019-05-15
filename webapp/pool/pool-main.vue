<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex class="mb-4" xs12>
        <v-btn
          :to="{ path: `/bazeni/${$route.params.type}` }"
          small
          exact
        >
          {{ $route.params.type }}
        </v-btn>
        <v-btn
          v-for="pool in selectedPools"
          :key="pool.id"
          :to="{ path: `/bazeni/${pool.type.code}/${pool.id}` }"
          small
        >
          {{ pool.name }}
        </v-btn>
      </v-flex>
      <v-flex xs12>
        <v-btn
          @click="showDialog"
          fab
          color="primary"
        >
          <v-icon dark>add</v-icon>
        </v-btn>
        <v-btn
          @click="showTransferDialog"
          color="secondary"
          class="ml-0"
          fab
        >
          <v-icon dark large>compare_arrows</v-icon>
        </v-btn>
        <v-btn
          @click="showMortalityDialog"
          color="error"
          class="ml-0"
          fab
        >
          <v-icon dark>delete</v-icon>
        </v-btn>
      </v-flex>
      <v-flex v-if="!$route.params.id" xs12>
        <v-card>
          <v-card-text>
            <pool-datatable
              :pools="selectedPools"
            />
          </v-card-text>
        </v-card>
      </v-flex>
      <router-view/>
    </v-layout>
    <pool-create-edit-dialog
      v-if="isPoolDialogShown"
      :dialog="isPoolDialogShown"
      :pool-types="types"
      @close="closeDialog"
      @submit="submitPool"
    />
    <pool-transfer-dialog
      v-if="isTransferDialogShown"
      :dialog="isTransferDialogShown"
      :generations="generations"
      :pools="pools"
      :pools-with-generation="poolsWithGeneration"
      :pools-without-generation="poolsWithoutGeneration"
      :generations-without-pool="generationsWithoutPool"
      @close="closeTransferDialog"
      @submit="submitTransfer"
    />
    <mortality-dialog
      v-if="isMortalityDialogShown"
      :dialog="isMortalityDialogShown"
      :pools="poolsWithGeneration"
      @close="closeMortalityDialog"
      @submit="submitMortality"
    />
  </v-container>
</template>

<script>
import { sortBy } from 'lodash';
import { mapState, mapGetters, mapActions } from 'vuex';

import MortalityDialog from '../mortality/mortality-dialog';
import PoolCreateEditDialog from './pool-create-edit-dialog';
import PoolDatatable from './pool-datatable';
import PoolTransferDialog from './pool-transfer-dialog';

export default {
  components: {
    MortalityDialog,
    PoolCreateEditDialog,
    PoolDatatable,
    PoolTransferDialog,
  },
  async fetch({ app, store }) {
    const generations = await app.$axios.$get('/generations');
    const pools = await app.$axios.$get('/pools');
    const types = await app.$axios.$get('/pools/types');

    store.commit('generation/set', generations);
    store.commit('pool/set', pools);
    store.commit('pool/setTypes', types);
  },
  data() {
    return {
      isPoolDialogShown: false,
      isTransferDialogShown: false,
      isMortalityDialogShown: false,
    };
  },
  computed: {
    ...mapState('generation', ['generations']),
    ...mapState('pool', ['pools', 'types']),
    ...mapGetters('pool', ['poolsByType']),
    selectedPools() {
      return this.poolsByType.get(this.$route.params.type);
    },
    poolsWithGeneration() {
      return sortBy(this.pools.filter((p) => p.generations.length), 'spawnDate');
    },
    poolsWithoutGeneration() {
      return sortBy(this.pools.filter((p) => !p.generations.length), 'spawnDate');
    },
    generationsWithoutPool() {
      return this.generations.filter((g) => !g.pools.length);
    },
  },
  methods: {
    ...mapActions('pool', ['create', 'update', 'transfer']),
    ...mapActions('mortality', { mortalityCreate: 'create' }),
    async submitPool(pool) {
      if (pool.id) {
        await this.update(pool);
      } else {
        await this.create(pool);
      }

      this.isPoolDialogShown = false;
    },
    closeDialog() {
      this.isPoolDialogShown = false;
    },
    showDialog() {
      this.isPoolDialogShown = true;
    },
    showTransferDialog() {
      this.isTransferDialogShown = true;
    },
    closeTransferDialog() {
      this.isTransferDialogShown = false;
    },
    submitTransfer(transferInfo) {
      this.isTransferDialogShown = false;
      this.transfer(transferInfo);
    },
    showMortalityDialog() {
      this.isMortalityDialogShown = true;
    },
    closeMortalityDialog() {
      this.isMortalityDialogShown = false;
    },
    submitMortality(mortalityInfo) {
      this.isMortalityDialogShown = false;
      this.mortalityCreate(mortalityInfo);
    },
  },
};
</script>
