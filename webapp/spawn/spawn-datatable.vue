<template>
  <v-data-table
    :headers="headers"
    :items="generations"
    :pagination.sync="pagination"
    no-data-text="Nema dostupnih podataka"
    no-results-text="Nema dostupnih podataka"
  >
    <template slot="items" slot-scope="props">
      <td>{{ props.item.spawnDate | format }}</td>
      <td class="text-xs-center">
        <v-chip
          @click="$emit('editGeneration', props.item)"
          color="primary"
          text-color="white"
          class="name-chip"
        >
          {{ props.item.name }}
        </v-chip>
      </td>
      <td class="text-xs-center">{{ props.item.picked }}</td>
      <td class="text-xs-center">{{ props.item.trash }}</td>
      <td class="text-xs-center">{{ props.item.goodRoe }}</td>
      <td class="text-xs-center">{{ props.item.badRoe }}</td>
      <td class="text-xs-center">{{ props.item.verticalIncubators }}</td>
      <td class="text-xs-center">{{ props.item.horizontalIncubators }}</td>
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
        sortBy: 'spawnDate',
        rowsPerPage: 10,
      },
      headers: [
        { text: 'Datum', value: 'spawnDate', align: 'left' },
        { text: 'Ime Generacije', value: 'name', align: 'center' },
        { text: 'Odabrano', value: 'picked', align: 'center' },
        { text: 'Škart', value: 'trash', align: 'center' },
        { text: 'Dobra Ikra', value: 'goodRoe', align: 'center' },
        { text: 'Loša ikra', value: 'badRoe', align: 'center' },
        { text: 'Vert. Inkubatori', value: 'verticalIncubators', align: 'center' },
        { text: 'Horiz. Inkubatori', value: 'horizontalIncubators', align: 'center' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.name-chip /deep/ {
  span {
    cursor: pointer;
  }
}
</style>
