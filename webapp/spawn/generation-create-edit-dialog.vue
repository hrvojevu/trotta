<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="500"
  >
    <v-card>
      <v-card-title class="headline">
        {{ generation.id ? `Izmjeni Generaciju - ${generation.name}` : 'Dodaj Generaciju' }}
      </v-card-title>
      <v-card-text>
        <v-layout wrap>
          <v-alert
            :value="error"
            class="pa-2"
            color="warning"
            icon="priority_high"
            transition="scale-transition"
          >
            {{ error }}
          </v-alert>
          <v-flex xs12>
            <v-menu
              ref="spawnDateMenu"
              v-model="spawnDateMenu"
              :close-on-content-click="false"
              :return-value.sync="generation.spawnDate"
              transition="scale-transition"
              min-width="290px"
              full-width
              offset-y
              lazy
            >
              <v-text-field
                v-validate="'required'"
                v-model="formattedSpawnDate"
                :error-messages="errors.collect('spawnDate')"
                data-vv-name="spawnDate"
                slot="activator"
                label="Datum Mrijesta"
                append-icon="event"
                readonly
                box
              />
              <v-date-picker
                v-model="generation.spawnDate"
                no-title
                @input="$refs.spawnDateMenu.save(generation.spawnDate)"/>
            </v-menu>
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-validate="'required'"
              v-model.number="generation.data.picked"
              :error-messages="errors.collect('picked')"
              data-vv-name="picked"
              class="pr-2"
              label="Odabrano"
              type="number"
              box
            />
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-validate="'required'"
              v-model.number="generation.data.trash"
              :error-messages="errors.collect('trash')"
              data-vv-name="trash"
              class="pl-2"
              label="Škart"
              type="number"
              box
            />
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-validate="'required'"
              v-model.number="generation.data.goodRoe"
              :error-messages="errors.collect('goodRoe')"
              data-vv-name="goodRoe"
              class="pr-2"
              label="Dobra Ikra"
              type="number"
              box
            />
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-validate="'required'"
              v-model.number="generation.data.badRoe"
              :error-messages="errors.collect('badRoe')"
              data-vv-name="badRoe"
              class="pl-2"
              label="Loša Ikra"
              type="number"
              box
            />
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-model.number="generation.data.verticalIncubators"
              :error-messages="errors.collect('verticalIncubators')"
              data-vv-name="verticalIncubators"
              class="pr-2"
              label="Vertikalni Inkubatori"
              type="number"
              box
            />
          </v-flex>
          <v-flex xs6>
            <v-text-field
              v-model.number="generation.data.horizontalIncubators"
              :error-messages="errors.collect('horizontalIncubators')"
              data-vv-name="horizontalIncubators"
              class="pl-2"
              label="Horizontalni Inkubatori"
              type="number"
              box
            />
          </v-flex>
        </v-layout>
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
          v-if="confirmSubmit"
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
import { format } from 'date-fns';
import { cloneDeep } from 'lodash';

export default {
  $_veeValidate: {
    validator: 'new'
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    generationProp: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      generation: {
        data: {},
        spawnDate: format(new Date(), 'YYYY-MM-DD'),
        ...cloneDeep(this.generationProp)
      },
      confirmSubmit: false,
      spawnDateMenu: false,
      dictionary: {
        messages: {
          required: 'Polje ne smije biti prazno'
        },
      },
      error: '',
    };
  },
  computed: {
    formattedSpawnDate() {
      return this.formatDate(this.generation.spawnDate);
    },
  },
  mounted() {
    this.$validator.localize('hr', this.dictionary);
  },
  methods: {
    formatDate(value) {
      return format(value, 'DD.MM.YYYY.');
    },
    createGenerationName() {
      const [day, month, year] = this.formatDate(this.generation.spawnDate).split('.');

      return `G${day}${month}${year.slice(-2)}`;
    },
    verifyData() {
      const picked = this.generation.data.trash
        + this.generation.data.goodRoe
        + this.generation.data.badRoe;

      return this.generation.data.picked !== picked;
    },
    async validateSubmit() {
      this.confirmSubmit = false;

      const valid = await this.$validator.validateAll();

      if (!valid) {
        return false;
      }

      if (this.verifyData()) {
        this.error = 'Zbroj polja škart, dobra ikra i loša ikra mora odgovarati broju polja \'odabrano\'.';
        return false;
      }

      this.confirmSubmit = true;
      this.error = '';

      return true;
    },
    async submit() {
      const valid = await this.validateSubmit();

      if (!valid) {
        return;
      }

      this.$emit('submit', { ...this.generation, name: this.createGenerationName() });
    },
  },
};
</script>
