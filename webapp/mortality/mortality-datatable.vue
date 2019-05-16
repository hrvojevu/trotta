<template>
  <v-data-table
    :headers="headers"
    :items="mortalities"
    :pagination.sync="pagination"
    no-data-text="Nema dostupnih podataka"
    no-results-text="Nema dostupnih podataka"
  >
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ formatDate(props.item.date) }}</td>
      <td class="text-xs-center">{{ props.item.count }}</td>
      <td class="text-xs-center">
        <v-chip color="secondary" text-color="white">{{ props.item.pool.name }}</v-chip>
      </td>
    </template>
  </v-data-table>
</template>

<script>
import { format } from 'date-fns';

export default {
  props: {
    mortalities: { type: Array, required: true },
  },
  data() {
    return {
      pagination: {
        sortBy: 'date',
        rowsPerPage: 10,
      },
      headers: [
        { text: 'Datum', value: 'date', align: 'center' },
        { text: 'Mortalitet', value: 'type', align: 'center' },
        { text: 'Bazen', value: 'name', align: 'center' },
      ],
    };
  },
  methods: {
    formatDate(date) {
      return format(date, 'DD.MM.YYYY.');
    },
  },
};
</script>
