<template>
  <v-data-table
    :headers="headers"
    :items="pools"
    :pagination.sync="pagination"
    no-data-text="Nema dostupnih podataka"
    no-results-text="Nema dostupnih podataka"
  >
    <template slot="items" slot-scope="props">
      <td>
        <v-btn
          :to="{ path: `/bazeni/${props.item.type.code}/${props.item.id}` }"
          flat
        >
          {{ props.item.name }}
        </v-btn>
      </td>
      <td class="text-xs-center">
        <v-chip color="secondary" text-color="white">{{ props.item.type.code }}</v-chip>
      </td>
      <td class="text-xs-center">
        <v-chip
          v-for="generation in props.item.generations"
          :key="generation.id"
          color="primary"
          text-color="white"
        >
          {{ generation.name }}
        </v-chip>
        <span v-if="!props.item.generations.length">-</span>
      </td>
      <td class="text-xs-center">{{ props.item.count }}</td>
      <td class="text-xs-center">{{ props.item.countKg }}</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    pools: {
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
        { text: 'Tip', value: 'type', align: 'center' },
        { text: 'Generacije', value: 'generations', align: 'center' },
        { text: 'Količina (kom)', value: 'count', align: 'center' },
        { text: 'Količina (kg)', value: 'countKg', align: 'center' },
      ],
    };
  },
};
</script>
