const nodeConfig = require('config');
const nodeExternals = require('webpack-node-externals'); // eslint-disable-line import/no-extraneous-dependencies

const pkg = require('./package');

module.exports = {
  mode: 'universal',

  /*
  ** The source directory of a nuxt.js application
  */
  srcDir: 'webapp/',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#FFFFFF' },

  /*
  ** Global CSS
  */
  css: [
    'vuetify/src/stylus/main.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/date-fns',
    '@/plugins/vee-validate',
    '@/plugins/vuetify',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/router',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: nodeConfig.get('app.api.uri'),
  },

  /*
  ** Set middleware which will be applied to all rotues
  */
  router: {
    middleware: 'auth'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
      if (ctx.isServer) {
        config.externals = [ // eslint-disable-line no-param-reassign
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ];
      }
    }
  }
};
