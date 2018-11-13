<template>
  <v-data-table
    :headers="headers"
    :items="pools"
    :pagination.sync="pagination"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.name }}</td>
      <td class="text-xs-center">
        <v-chip color="secondary" text-color="white">{{ props.item.type.code }}</v-chip>
      </td>
      <td class="text-xs-center">{{ props.item.length || '-' }}</td>
      <td class="text-xs-center">{{ props.item.width || '-' }}</td>
      <td class="text-xs-center">{{ props.item.depth || '-' }}</td>
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
        { text: 'Dužina', value: 'length', align: 'center' },
        { text: 'Širina', value: 'width', align: 'center' },
        { text: 'Dubina', value: 'depth', align: 'center' },
      ],
    };
  },
};
</script>
