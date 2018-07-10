<template>
  <v-layout>
    <v-flex xs2>
      <v-card>
        <v-card-title primary-title>
          <h3 class="headline mb-0">{{ pool.name }}</h3>
        </v-card-title>
        <v-card-text>
          <p>Dužina: {{ pool.length || '-' }} m</p>
          <p>Śirina: {{ pool.width || '-' }} m</p>
          <p>Dubina: {{ pool.depth || '-' }} m</p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('pool', ['getById']),
    pool() {
      return this.getById.get(this.$route.params.id);
    },
  },
};
</script>
