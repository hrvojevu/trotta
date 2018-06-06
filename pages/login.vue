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
          <v-alert
            :value="error"
            color="warning"
            icon="priority_high"
            transition="scale-transition"
            class="pa-2"
          >
            {{ error }}
          </v-alert>
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
import { mapActions } from 'vuex';

export default {
  $_veeValidate: {
    validator: 'new'
  },
  middleware: 'login',
  layout: 'auth',
  data() {
    return {
      error: '',
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
    };
  },
  mounted() {
    this.$validator.localize('en', this.dictionary);
  },
  methods: {
    ...mapActions('auth', ['login']),
    async submit() {
      const valid = await this.$validator.validateAll();

      if (!valid) {
        return;
      }

      try {
        await this.login({ username: this.username, password: this.password });

        this.$router.push('/');
      } catch (error) {
        this.error = error.message;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
