<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600"
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
      <template v-if="transferType === REGULAR_TRANSFER">
        <v-stepper-step :complete="step > 2" step="2">Odaberi izvorišni bazen</v-stepper-step>
        <v-stepper-content step="2">
          <v-autocomplete
            v-model="selectedFromPool"
            v-validate="{ required: true }"
            :error-messages="errors.collect('fromPool')"
            :items="poolsWithGeneration"
            :no-data-text="noDataText"
            key="fromPool"
            data-vv-name="fromPool"
            label="Izvorišni bazena"
            item-text="name"
            return-object
            persistent-hint
            box
          />
          <div v-if="selectedFromPool" class="pool-info mb-3">
            <span class="label">Trenutne generacije</span>
            <span v-if="!generationsInFromPool.length">-</span>
            <v-chip
              v-for="generation in generationsInFromPool"
              :key="generation.id"
              color="primary"
              text-color="white"
            >
              {{ generation.name }}
            </v-chip>
          </div>

          <v-btn
            color="primary"
            @click="setStep(2, 'fromPool')"
            class="ma-0"
            flat
          >
            Nastavi
          </v-btn>
          <v-btn @click="step = 1; selectedFromPool = null; errors.clear()" flat>Natrag</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="step > 3" step="3">Odaberi transferiranu količinu</v-stepper-step>
        <v-stepper-content step="3">
          <template v-if="selectedFromPool">
            <div class="pool-info mb-3">
              <span class="label">Ukupno u bazenu</span>
              <span>{{ selectedFromPool.count }}</span>
            </div>
            <v-text-field
              v-model="transferCount"
              v-validate="{ required: true, min_value: 1, max_value: selectedFromPool.count }"
              :error-messages="errors.collect('transferCount')"
              :max="selectedFromPool.count"
              type="number"
              key="transferCount"
              label="Transferirana količina"
              data-vv-name="transferCount"
              box
            />
          </template>

          <v-btn
            color="primary"
            @click="setStep(3, 'transferCount')"
            class="ma-0"
            flat
          >
            Nastavi
          </v-btn>
          <v-btn @click="step = 2; transferCount = selectedFromPool.count; errors.clear()" flat>Natrag</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="step > 4" step="4">Odaberi odredišni bazen</v-stepper-step>
        <v-stepper-content step="4">
          <v-autocomplete
            v-model="selectedToPool"
            v-validate="{ required: true, is_not: selectedFromPool }"
            :error-messages="errors.collect('toPool')"
            :items="pools"
            :no-data-text="noDataText"
            key="toPool"
            data-vv-name="toPool"
            label="Odredišni bazen"
            item-text="name"
            return-object
            persistent-hint
            box
          />
          <div v-if="selectedToPool" class="pool-info mb-3">
            <span class="label">Trenutne generacije</span>
            <span v-if="!generationsInToPool.length">-</span>
            <v-chip
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
            @click="setStep(4, 'toPool')"
            class="ma-0"
            flat
          >
            Nastavi
          </v-btn>
          <v-btn @click="step = 3; selectedToPool = null; errors.clear()" flat>Natrag</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="step > 5" step="5">Provjera transfera</v-stepper-step>
        <v-stepper-content step="5">
          <v-layout v-if="selectedFromPool && selectedToPool">
            <v-flex xs6>
              <v-sheet color="grey lighten-3" class="text-xs-center">
                <v-sheet color="grey lighten-2">
                  <v-chip color="secondary" text-color="white">{{ selectedFromPool.name }}</v-chip>
                </v-sheet>
                <v-divider />
                <h4>Transferirane generacije</h4>
                <v-chip
                  v-for="generation in generationsInFromPool"
                  :key="generation.id"
                  color="primary"
                  text-color="white"
                >
                  {{ generation.name }}
                </v-chip>
                <v-divider />
                <h4>Transferirana količina</h4>
                <v-chip label>
                  <v-icon left>mdi-fish</v-icon>
                  {{ transferCount }} kom
                </v-chip>
                <v-chip label>
                  <v-icon left>mdi-weight-kilogram</v-icon>
                  {{ transferCountKg }} kg
                </v-chip>
              </v-sheet>
            </v-flex>
            <v-icon large>keyboard_arrow_right</v-icon>
            <v-flex xs6>
              <v-sheet color="grey lighten-3" class="text-xs-center">
                <v-sheet color="grey lighten-2">
                  <v-chip color="secondary" text-color="white">{{ selectedToPool.name }}</v-chip>
                </v-sheet>
                <v-divider />
                <h4>Trenutne generacije</h4>
                <span v-if="!generationsInToPool.length">-</span>
                <template v-else>
                  <v-chip
                    v-for="generation in generationsInToPool"
                    :key="generation.id"
                    color="primary"
                    text-color= "white"
                  >
                    {{ generation.name }}
                  </v-chip>
                  <v-divider />
                  <h4>Trenutna količina</h4>
                  <v-chip label>
                    <v-icon left>mdi-fish</v-icon>
                    {{ selectedToPool.count }} kom
                  </v-chip>
                  <v-chip label>
                    <v-icon left>mdi-weight-kilogram</v-icon>
                    {{ selectedToPool.countKg }} kg
                  </v-chip>
                </template>
              </v-sheet>
            </v-flex>
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
          <v-btn @click="step = 4; isSubmitConfirmed = false" flat>Natrag</v-btn>
        </v-stepper-content>
      </template>

      <template v-else>
        <v-stepper-step :complete="step > 2" step="2">Odaberi generaciju</v-stepper-step>
        <v-stepper-content step="2">
          <v-autocomplete
            v-model="selectedGeneration"
            v-validate="{ required: true }"
            :error-messages="errors.collect('generation')"
            :items="generationsWithoutPool"
            :no-data-text="noDataText"
            key="generation"
            data-vv-name="generation"
            label="Generacija"
            item-text="name"
            return-object
            persistent-hint
            box
          />

          <v-btn
            color="primary"
            @click="setStep(2, 'generation')"
            class="ma-0"
            flat
          >
            Nastavi
          </v-btn>
          <v-btn @click="step = 1; selectedGeneration = null; errors.clear()" flat>Natrag</v-btn>
        </v-stepper-content>
        <v-stepper-step :complete="step > 3" step="3">Odaberi odredišni bazen</v-stepper-step>
        <v-stepper-content step="3">
          <v-autocomplete
            v-model="selectedToPool"
            v-validate="{ required: true }"
            :error-messages="errors.collect('toPool')"
            :items="poolsWithoutGeneration"
            :no-data-text="noDataText"
            key="toPool"
            data-vv-name="toPool"
            label="Odredišni bazen"
            item-text="name"
            return-object
            persistent-hint
            box
          />

          <v-btn
            color="primary"
            @click="setStep(3, 'toPool')"
            class="ma-0"
            flat
          >
            Nastavi
          </v-btn>
          <v-btn @click="step = 2; selectedToPool = null; errors.clear()" flat>Natrag</v-btn>
        </v-stepper-content>
        <v-stepper-step step="4">Provjera transfera</v-stepper-step>
        <v-stepper-content
          v-if="selectedGeneration && selectedToPool"
          :complete="step > 4"
          step="4"
        >
          <v-layout>
            <v-chip
              color="primary"
              text-color="white"
            >
              {{ selectedGeneration.name }}
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
      </template>
    </v-stepper>
  </v-dialog>
</template>

<script>
import { get } from 'lodash';

const REGULAR_TRANSFER = 'REGULAR_TRANSFER';
const INITIAL_TRANFER = 'INITIAL_TRANFER';

export default {
  $_veeValidate: {
    validator: 'new'
  },
  props: {
    dialog: { type: Boolean, default: false },
    generations: { type: Array, default: () => ([]) },
    generationsWithoutPool: { type: Array, default: () => ([]) },
    pools: { type: Array, default: () => ([]) },
    poolsWithGeneration: { type: Array, default: () => ([]) },
    poolsWithoutGeneration: { type: Array, default: () => ([]) },
  },
  data() {
    return {
      REGULAR_TRANSFER,
      INITIAL_TRANFER,
      transferType: REGULAR_TRANSFER,
      step: 1,
      selectedFromPool: null,
      selectedToPool: null,
      transferCount: 0,
      selectedGeneration: null,
      isSubmitConfirmed: false,
      noDataText: 'Nema dostupnih podataka',
      dictionary: {
        messages: {
          required: 'Polje ne smije biti prazno',
          min_value: 'Unesena vrijednost ne smije biti 0',
          max_value: 'Unesena vrijednost ne smije biti veća od količine u izvorišnom bazenu',
          is_not: 'Odredišni bazen mora biti različit od izvorišnog',
        },
      },
      error: '',
    };
  },
  watch: {
    selectedFromPool(pool) {
      this.transferCount = get(pool, 'count', 0);
    },
  },
  computed: {
    generationsInFromPool() {
      return this.selectedFromPool ?
        this.pools.find((p) => this.selectedFromPool.id === p.id).generations : [];
    },
    generationsInToPool() {
      return this.selectedToPool ?
        this.pools.find((p) => this.selectedToPool.id === p.id).generations : [];
    },
    transferCountKg() {
      const transferedPercentage = this.transferCount / this.selectedFromPool.count;

      return this.selectedFromPool.countKg * transferedPercentage;
    },
  },
  mounted() {
    this.$validator.localize('hr', this.dictionary);
  },
  methods: {
    async setStep(currentStep, field) {
      if (!field) {
        this.step = currentStep + 1;

        return;
      }

      const valid = await this.$validator.validate(field);

      if (!valid) {
        return;
      }

      this.step = currentStep + 1;
      this.errors.clear();
    },
    async submit() {
      if (this.transferType === REGULAR_TRANSFER) {
        this.$emit('submit', {
          fromPoolId: this.selectedFromPool.id,
          toPoolId: this.selectedToPool.id,
          transferCount: this.transferCount,
        });
      } else if (this.transferType === INITIAL_TRANFER) {
        this.$emit('submit', {
          initial: true,
          generationId: this.selectedGeneration.id,
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
}
</style>
