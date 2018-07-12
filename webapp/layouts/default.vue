<template>
  <v-app light>
    <v-navigation-drawer
      :mini-variant="false"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <template v-for="link in links">
          <v-list-group
            v-if="link.subLinks"
            v-model="link.active"
            :key="link.title"
            :prepend-icon="link.icon"
            no-action
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ link.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              router
              :to="subLink.to"
              v-for="subLink in link.subLinks"
              :key="subLink.title"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ subLink.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile
            v-else
            :key="link.title"
            router
            :to="link.to"
          >
            <v-list-tile-action>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>{{ link.title }}</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-divider/>
        <v-list-tile @click="out">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider/>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      fixed
      app
      :clipped-left="clipped">
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="true" app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      links: [
        { icon: 'apps', title: 'Početna', to: '/' },
        {
          icon: 'mdi-waves',
          title: 'Bazeni',
          subLinks: [
            { title: 'Veliki bazeni', to: { path: '/bazeni/BV' } },
            { title: 'Veliki predbazeni', to: { path: '/bazeni/PBV' } },
            { title: 'Mali predbazeni', to: { path: '/bazeni/PBM' } },
            { title: 'Kanali', to: { path: '/bazeni/K' } },
          ],
        },
        { icon: 'mdi-fish', title: 'Generacije', to: '/generacije' },
      ],
      title: 'The Black Project'
    };
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async out() {
      await this.logout();

      this.$router.push('/login');
    },
  },
};
</script>
