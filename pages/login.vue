<template>
  <v-layout>
    <v-flex
      xs12
      sm6
      offset-sm3>
      <v-card>
        <v-card-title primary-title>
          <h1 class="headline mb-0">Login</h1>
        </v-card-title>
        <v-card-text>
          <form>
            <v-text-field
              v-validate="'required'"
              v-model="username"
              :error-messages="errors.collect('username')"
              append-icon="person"
              label="Username"
              data-vv-name="username"
              required
            />
            <v-text-field
              v-validate="'required|min:8'"
              v-model="password"
              :error-messages="errors.collect('password')"
              append-icon="visibility_off"
              label="Password"
              type="password"
              data-vv-name="password"
              required
            />
          </form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="submit">login</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  $_veeValidate: {
    validator: 'new'
  },
  layout: 'auth',
  data: () => ({
    username: '',
    password: '',
    dictionary: {
      custom: {
        username: {
          required: () => 'Username can not be empty',
        },
        password: {
          required: () => 'Password can not be empty',
        },
      }
    }
  }),
  mounted() {
    this.$validator.localize('en', this.dictionary);
  },
  methods: {
    submit() {
      this.$validator.validateAll();
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
