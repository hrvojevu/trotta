<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="500"
  >
    <v-card>
      <v-card-title class="headline">Unesi Mortalitet</v-card-title>
      <v-card-text>
        <v-autocomplete
          v-model="selectedPool"
          v-validate="{ required: true }"
          :error-messages="errors.collect('selectedPool')"
          :items="pools"
          :no-data-text="noDataText"
          key="selectedPool"
          data-vv-name="selectedPool"
          label="Bazen"
          item-text="name"
          return-object
          persistent-hint
          box
        />
        <template v-if="selectedPool">
          <v-text-field
            v-model="count"
            v-validate.number="{ required: true, min_value: 1, max_value: selectedPool.count }"
            :error-messages="errors.collect('count')"
            :max="selectedPool.count"
            type="number"
            key="count"
            label="Mortalitet"
            data-vv-name="count"
            box
          />
          <v-menu
            ref="dateMenu"
            v-model="isDateMenuShown"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            min-width="290px"
            full-width
            offset-y
            lazy
          >
            <v-text-field
              v-validate="{ required: true }"
              v-model="formatedDate"
              :error-messages="errors.collect('date')"
              data-vv-name="date"
              slot="activator"
              label="Datum"
              append-icon="event"
              readonly
              box
            />
            <v-date-picker
              v-model="date"
              :allowed-dates="getAllowedDates"
              class="date-picker"
              no-title
              locale="hr-HR"
              first-day-of-week="1"
              @input="$refs.dateMenu.save(date)"/>
          </v-menu>
        </template>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="primary"
          flat="flat"
          @click="$emit('close')"
        >
          Odustani
        </v-btn>
        <v-btn
          v-if="isSubmitConfirmed"
          color="primary"
          flat="flat"
          @click="submit"
        >
          Potvrdi
        </v-btn>
        <v-btn
          v-else
          color="primary"
          flat="flat"
          @click="validateSubmit"
        >
          Spremi
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { format, isPast } from 'date-fns';

const TODAY = new Date();

export default {
  $_veeValidate: {
    validator: 'new'
  },
  props: {
    dialog: { type: Boolean, default: false },
    pools: { type: Array, default: () => [] },
  },
  computed: {
    formatedDate() {
      return format(this.date, 'DD.MM.YYYY.');
    },
  },
  data() {
    return {
      selectedPool: null,
      count: 1,
      date: format(TODAY, 'YYYY-MM-DD'),
      isSubmitConfirmed: false,
      isDateMenuShown: false,
      noDataText: 'Nema dostupnih podataka',
      dictionary: {
        messages: {
          required: 'Polje ne smije biti prazno',
          min_value: 'Unesena vrijednost ne smije biti 0',
          max_value: 'Unesena vrijednost ne smije biti veća od količine u bazenu',
        },
      },
    };
  },
  mounted() {
    this.$validator.localize('hr', this.dictionary);
  },
  methods: {
    getAllowedDates(date) {
      return isPast(date);
    },
    async validateSubmit() {
      this.isSubmitConfirmed = false;

      const valid = await this.$validator.validateAll();

      if (!valid) {
        return false;
      }

      this.isSubmitConfirmed = true;

      return true;
    },
    async submit() {
      const valid = await this.validateSubmit();

      if (!valid) {
        return;
      }

      this.$emit('submit', {
        poolId: this.selectedPool.id,
        count: this.count,
        date: this.date,
      });
    },
  },
};
</script>
