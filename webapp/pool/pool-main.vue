<template>
  <div>
    <v-btn
      v-for="pool in pools"
      :key="pool.id"
      :to="{ path: `/bazeni/${pool.type.code}/${pool.id}` }"
      small
    >
      {{ pool.name }}
    </v-btn>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  async fetch({ app, store }) {
    const pools = await app.$axios.$get('/pools');

    store.commit('pool/set', pools);
  },
  computed: {
    ...mapGetters('pool', ['poolsByType']),
    pools() {
      return this.poolsByType.get(this.$route.params.type);
    },
  },
  methods: {
  },
};
</script>
