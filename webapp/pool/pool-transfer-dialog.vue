<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="500"
  >
    <v-stepper v-model="step" vertical>
      <v-btn
        @click="$emit('close')"
        flat
        icon
      >
        <v-icon>close</v-icon>
      </v-btn>
      <v-stepper-step :complete="step > 1" step="1">Odaberi tip transfera</v-stepper-step>
      <v-stepper-content step="1">
        <v-radio-group v-model="transferType" row>
          <v-radio label="Obični transfer" :value="REGULAR_TRANSFER"/>
          <v-radio label="Inicijalni transfer" :value="INITIAL_TRANFER"/>
        </v-radio-group>
        <v-btn
          color="primary"
          @click="step = 2"
          class="ma-0"
          flat
        >
          Nastavi
        </v-btn>
      </v-stepper-content>
      <v-stepper-step :complete="step > 2" step="2">
        {{ transferType === REGULAR_TRANSFER ? 'Odaberi izvorišni bazen' : 'Odaberi generaciju' }}
      </v-stepper-step>
      <v-stepper-content step="2">
        <div v-show="transferType === REGULAR_TRANSFER">
          <v-autocomplete
            v-model="selectedFromPool"
            v-validate="'required'"
            :error-messages="errors.collect('fromPool')"
            :items="poolsWithGeneration"
            :no-data-text="noDataText"
            data-vv-name="fromPool"
            label="Izvorišni bazena"
            item-text="name"
            return-object
            persistent-hint
            box
          />
          <div
            v-if="selectedFromPool"
            class="pool-info mb-3"
            xs12
          >
            <span class="label">Trenutne generacije</span>
            <span v-if="!generationsInFromPool.length" class="pool-gens">-</span>
            <v-chip
              v-else
              v-for="generation in generationsInFromPool"
              :key="generation.id"
              color="primary"
              text-color="white"
            >
              {{ generation.name }}
            </v-chip>
          </div>
        </div>
        <v-autocomplete
          v-show="transferType === INITIAL_TRANFER"
          v-model="selectedGeneration"
          v-validate="'required'"
          :error-messages="errors.collect('generation')"
          :items="generationsWithoutPool"
          :no-data-text="noDataText"
          data-vv-name="generation"
          label="Generacija"
          item-text="name"
          return-object
          persistent-hint
          box
        />
        <v-btn
          color="primary"
          @click="transferType === REGULAR_TRANSFER ? nextStep(2, 'fromPool') : nextStep(2, 'generation')"
          class="ma-0"
          flat
        >
          Nastavi
        </v-btn>
        <v-btn @click="step = 1; errors.clear(); selectedGeneration = null" flat>Natrag</v-btn>
      </v-stepper-content>
      <v-stepper-step :complete="step > 3" step="3">Odaberi odredišni bazen</v-stepper-step>
      <v-stepper-content step="3">
        <v-autocomplete
          v-model="selectedToPool"
          v-validate="'required'"
          :error-messages="errors.collect('toPool')"
          :items="pools"
          :no-data-text="noDataText"
          data-vv-name="toPool"
          label="Odredišni bazen"
          item-text="name"
          return-object
          persistent-hint
          box
        />
        <div
          v-if="selectedToPool"
          class="pool-info mb-3"
          xs12
        >
          <span class="label">Trenutne generacije</span>
          <span v-if="!generationsInToPool.length" class="pool-gens">-</span>
          <v-chip
            v-else
            v-for="generation in generationsInToPool"
            :key="generation.id"
            color="primary"
            text-color="white"
          >
            {{ generation.name }}
          </v-chip>
        </div>
        <v-btn
          color="primary"
          @click="nextStep(3, 'toPool')"
          class="ma-0"
          flat
        >
          Nastavi
        </v-btn>
        <v-btn @click="step = 2; errors.clear()" flat>Natrag</v-btn>
      </v-stepper-content>
      <v-stepper-step step="4">Provjera transfera</v-stepper-step>
      <v-stepper-content step="4">
        <v-layout v-if="selectedToPool">
          <template v-if="transferType === REGULAR_TRANSFER">
            <v-chip
              v-for="generation in generationsInFromPool"
              :key="generation.id"
              color="primary"
              text-color="white"
            >
              {{ generation.name }}
            </v-chip>
          </template>
          <v-chip
            v-if="transferType === INITIAL_TRANFER"
            color="primary"
            text-color="white"
          >
            {{ selectedGeneration ? selectedGeneration.name : '' }}
          </v-chip>
          <v-icon large>keyboard_arrow_right</v-icon>
          <v-chip color="secondary" text-color="white">{{ selectedToPool.name }}</v-chip>
        </v-layout>
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
          @click="isSubmitConfirmed = true"
          class="ma-0"
          flat
        >
          Spremi
        </v-btn>
        <v-btn @click="step = 3; isSubmitConfirmed = false" flat>Natrag</v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-dialog>
</template>

<script>
import { sortBy } from 'lodash';

const REGULAR_TRANSFER = 'REGULAR_TRANSFER';
const INITIAL_TRANFER = 'INITIAL_TRANFER';

export default {
  $_veeValidate: {
    validator: 'new'
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    generations: {
      type: Array,
      default: () => ([]),
    },
    pools: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      REGULAR_TRANSFER,
      INITIAL_TRANFER,
      transferType: REGULAR_TRANSFER,
      step: 1,
      selectedFromPool: null,
      selectedToPool: null,
      selectedGeneration: null,
      isSubmitConfirmed: false,
      noDataText: 'Nema dostupnih podataka',
      dictionary: {
        messages: {
          required: 'Polje ne smije biti prazno'
        },
      },
      error: '',
    };
  },
  computed: {
    poolsWithGeneration() {
      return sortBy(this.pools.filter((p) => p.generations.length), 'spawnDate');
    },
    generationsInFromPool() {
      return this.selectedFromPool ?
        this.pools.find((p) => this.selectedFromPool.id === p.id).generations : [];
    },
    generationsInToPool() {
      return this.selectedToPool ?
        this.pools.find((p) => this.selectedToPool.id === p.id).generations : [];
    },
    generationsWithoutPool() {
      return this.generations.filter((g) => !g.pools.length);
    },
  },
  mounted() {
    this.$validator.localize('hr', this.dictionary);
  },
  methods: {
    async nextStep(currentStep, field) {
      if (!field) {
        this.step = currentStep + 1;

        return;
      }

      const valid = await this.$validator.validate(field);

      if (!valid) {
        return;
      }

      this.step = currentStep + 1;
    },
    async submit() {
      if (this.transferType === REGULAR_TRANSFER) {
        this.$emit('submit', {
          fromPoolId: this.selectedFromPool.id,
          toPoolId: this.selectedToPool.id,
        });
      } else if (this.transferType === INITIAL_TRANFER) {
        this.$emit('submit', {
          generations: [this.selectedGeneration.id],
          toPoolId: this.selectedToPool.id,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pool-info {
  padding: 8px 12px;
  padding-bottom: 4px;
  background: #f4f4f4;
  border-bottom: 2px solid #a0a0a0;
  border-radius: 4px 4px 0 0;

  .label {
    display: block;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.54);
  }

  .pool-gens {
    font-size: 16px;
  }
}
</style>
