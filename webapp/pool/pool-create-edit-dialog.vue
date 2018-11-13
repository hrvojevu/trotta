<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="500"
  >
    <v-card>
      <v-card-title class="headline">
        {{ pool.id ? `Izmjeni - ${poolProp.name}` : 'Dodaj Bazen' }}
      </v-card-title>
      <v-card-text>
        <v-layout wrap>
          <v-flex xs12>
            <v-text-field
              v-model="pool.name"
              v-validate="'required'"
              :error-messages="errors.collect('name')"
              label="Ime"
              data-vv-name="name"
              box
            />
          </v-flex>
          <v-flex xs12>
            <v-select
              v-model="pool.poolTypeId"
              v-validate="'required'"
              :error-messages="errors.collect('poolTypeId')"
              :items="types"
              label="Tip"
              data-vv-name="poolTypeId"
              item-text="name"
              item-value="id"
              box
            />
          </v-flex>
          <v-flex xs4>
            <v-text-field
              v-validate="'numeric'"
              v-model.number="pool.length"
              :error-messages="errors.collect('length')"
              label="Dužina"
              data-vv-name="length"
              class="pr-2"
              box
            />
          </v-flex>
          <v-flex xs4>
            <v-text-field
              v-model.number="pool.width"
              v-validate="'numeric'"
              :error-messages="errors.collect('width')"
              label="Širina"
              data-vv-name="width"
              class="pr-2"
              box
            />
          </v-flex>
          <v-flex xs4>
            <v-text-field
              v-model.number="pool.depth"
              v-validate="'numeric'"
              :error-messages="errors.collect('depth')"
              label="Dubina"
              data-vv-name="depth"
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
import { cloneDeep } from 'lodash';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  $_veeValidate: {
    validator: 'new'
  },
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    poolProp: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      pool: cloneDeep(this.poolProp),
      isSubmitConfirmed: false,
      dictionary: {
        messages: {
          required: 'Polje ne smije biti prazno',
          numeric: 'Polje smije sadržavati samo brojeve',
        },
      },
    };
  },
  computed: {
    ...mapGetters('pool', ['getTypeByCode']),
    ...mapState('pool', ['types']),
    poolTypes() {
      return this.types.map((t) => t.name);
    },
  },
  mounted() {
    this.$validator.localize('hr', this.dictionary);
  },
  methods: {
    ...mapActions('pool', ['create', 'update']),
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

      if (this.pool.id) {
        await this.update(this.pool);
      } else {
        await this.create(this.pool);
      }

      this.$emit('close');
    },
  },
};
</script>
