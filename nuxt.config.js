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
    '@nuxtjs/apollo',

  ],

  // Fontloader configuration
  fontLoader: {
    url: '/fonts/fonts.css'
  },

  // Apollo configuration
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://backend.epical.me/shop-api',
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
