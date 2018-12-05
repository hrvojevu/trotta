<template>
  <v-data-table
    :headers="headers"
    :items="generations"
    :pagination.sync="pagination"
  >
    <template slot="items" slot-scope="props">
      <td>
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
      <td class="text-xs-center">{{ props.item.spawnDate | format }}</td>
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
        sortBy: 'name',
        rowsPerPage: 10,
      },
      headers: [
        { text: 'Ime', value: 'name', align: 'left' },
        { text: 'Bazen', value: 'pool', align: 'center' },
        { text: 'Dužina', value: 'length', align: 'center' },
        { text: 'Širina', value: 'width', align: 'center' },
        { text: 'Težina', value: 'weight', align: 'center' },
        { text: 'Datum Mrijesta', value: 'spawnDate', align: 'center' },
      ],
    };
  },
};
</script>
