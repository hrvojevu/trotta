<template>
  <v-layout row wrap>
    <v-flex xs2>
      <v-card>
        <v-card-title primary-title>
          <h3 class="headline mb-0">{{ pool.name }}</h3>
          <v-btn
            flat
            icon
            color="primary"
            @click.stop="isPoolDialogShown = true"
          >
            <v-icon>settings</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <p>Dužina: {{ pool.length || '-' }} m</p>
          <p>Śirina: {{ pool.width || '-' }} m</p>
          <p>Dubina: {{ pool.depth || '-' }} m</p>
        </v-card-text>
      </v-card>
    </v-flex>
    <pool-create-edit-dialog
      v-if="isPoolDialogShown"
      :dialog="isPoolDialogShown"
      :pool-prop="pool"
      @close="isPoolDialogShown = false"
    />
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

import PoolCreateEditDialog from './pool-create-edit-dialog';

export default {
  components: {
    PoolCreateEditDialog,
  },
  data() {
    return {
      isPoolDialogShown: false,
    };
  },
  computed: {
    ...mapGetters('pool', ['getById']),
    pool() {
      return this.getById.get(this.$route.params.id);
    },
  },
};
</script>
