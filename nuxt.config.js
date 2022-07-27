export default {

  publicRuntimeConfig: {
    designerurl: process.env.DESIGNER_URL,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Epical.me | Personal Calendars',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/variables.scss',
    '~/assets/styles/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
   { src: '~/plugins/globalFunctions.js'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    'nuxt-font-loader'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://www.npmjs.com/package/@nuxtjs/apollo
    //'@nuxtjs/auth-next',
    '@nuxtjs/apollo',

    ['nuxt-stripe-module', {
      //publishableKey: 'pk_test_51L851ZKeMy0OEQsmGXVMkBtpOP2kDRrLieecaVcVxcAFWxM8dmHZIvMYA868imYcPRU5B5G7NwBe8ds74BLe248Q00dFBMl65F',
      publishableKey: 'pk_test_51JD74vKtd6Df5K5e80kaExqOQvMPiaZB3sNwGk4uhYCPhzKFRZEY2sbFUGzqRroslNOkdyNH9fPujs4AOg8Nzq3c007EG8jsdK',
    }],

  ],

  // Fontloader configuration
  fontLoader: {
    url: '/fonts/fonts.css'
  },

  // Apollo configuration
  apollo: {
    clientConfigs: {
      default: {
        //httpEndpoint: 'http://localhost:3001/shop-api',
        //httpEndpoint: 'https://backend.epical.me/shop-api',
        //httpEndpoint: 'http://test.epical.me:3001/shop-api',
        httpEndpoint: process.env.VENDURE_URI,
        httpLinkOptions: {
          credentials: 'include'
        },
        /*
        watchLoading: '~/plugins/apollo-watch-loading-handler.js',
        errorHandler: '~/plugins/apollo-error-handler.js',
        wsEndpoint: null, // process.env.STRAPI_GRAPHQL_WS_URL,
        tokenName: 'session-token',
        authenticationType: 'Bearer',
        persisting: false,
        websocketsOnly: false 
        */

      },
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Epical.me - Personal Calendars', 
      short_name: 'Epical.me',
      description: 'Personal Calendars',
      lang: 'se', 
      display: "standalone",
      background_color: "#e7e4e1",
      theme_color: "#c3cfbb",
      start_url: "/",
      //useWebmanifestExtension: false
    }, 

    meta: {
      background_color: "#e7e4e1",
      theme_color: "#c3cfbb",
      lang: 'de', 
    },

    icon: {
      /* werden automatisch von /static/icon.png generiert */
    }, 

    workbox: {
      //enabled: true // Service-Worker in Development eigentlich aus
    },

  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
