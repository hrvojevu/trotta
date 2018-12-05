<template>
  <v-data-table
    :headers="headers"
    :items="generations"
    :pagination.sync="pagination"
    no-data-text="Nema dostupnih podataka"
    no-results-text="Nema dostupnih podataka"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.spawnDate | format }}</td>
      <td class="text-xs-center">
        <v-chip color="primary" text-color="white">{{ props.item.name }}</v-chip>
      </td>
      <td class="text-xs-center">
        <span v-if="!props.item.pools.length">-</span>
        <span
          v-else
          v-for="pool in props.item.pools"
          :key="pool.id"
        >
          {{ pool.name }}
        </span>
      </td>
      <td class="text-xs-center">{{ props.item.length || '-' }}</td>
      <td class="text-xs-center">{{ props.item.width || '-' }}</td>
      <td class="text-xs-center">{{ props.item.weight || '-' }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    generations: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      pagination: {
        descending: true,
        sortBy: 'spawnDate',
        rowsPerPage: 10,
      },
      headers: [
        { text: 'Datum Mrijesta', value: 'spawnDate', align: 'left' },
        { text: 'Ime', value: 'name', align: 'center' },
        { text: 'Bazen', value: 'pool', align: 'center' },
        { text: 'Dužina', value: 'length', align: 'center' },
        { text: 'Širina', value: 'width', align: 'center' },
        { text: 'Težina', value: 'weight', align: 'center' },
      ],
    };
  },
};
</script>
