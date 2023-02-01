export default {

  publicRuntimeConfig: {
    designerurl: process.env.DESIGNER_URL,
    tkapi_url: process.env.TKAPI_URL,
    tkapi_login: process.env.TKAPI_LOGIN,
    imageapi_url: process.env.IMAGEAPI_URL,
    imageapi_login: process.env.IMAGEAPI_LOGIN,
    vendure_uri: process.env.VENDURE_URI,
    vendure_admin_login: process.env.VENDURE_ADMIN_LOGIN,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Kalender selbst gestalten | Mein-Taschenkalender.com 2023',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Taschenkalender, Notizbücher und Terminplaner selbst gestalten. Mit Deinen Fotos und persönlichem Inhalt.' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    script: [ 
      {
        /* Über GTM
        src: "https://consent.cookiebot.com/uc.js",
        'data-cbid': "d7565828-4545-42fc-a7bc-a9e0ac0742a3",
        'data-blockingmode': "auto",
        */
        //async: false
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', media: 'all', href: 'https://use.typekit.net/iyy7igj.css'},
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/variables.scss',
    '~/assets/styles/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { 
      src: '~/plugins/globalFunctions.js',
      //src: '~/plugins/axios.js'
      
    },
    {src: '~/plugins/vue-carousel.js', mode: 'client'}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    //'nuxt-font-loader'
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

    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',

    // GoogleTagManager https://morioh.com/p/e41edc2bbdaf
    '@nuxtjs/gtm',

    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',

    ['nuxt-stripe-module', {
      publishableKey: 'pk_test_51JD74vKtd6Df5K5e80kaExqOQvMPiaZB3sNwGk4uhYCPhzKFRZEY2sbFUGzqRroslNOkdyNH9fPujs4AOg8Nzq3c007EG8jsdK',
      //publishableKey: 'pk_live_51JD74vKtd6Df5K5e9GhNksL2KItGRjPiPG0EW8bYNxz3Xn4igAYh3UMIFiOEZY3hSNSl4PfJRalGDesrePxCyk4900bhA1FuFO'
    }],

  ],

  // Google Tag Manager Settings
  gtm: {
    enabled:true,
    id: 'GTM-NTMJKNB'
  },


  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.TKAPI_URL,
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        
        endpoints: {
          login: { url: '/auth/login', method: 'post', propertyName: 'data.token' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get', propertyName: 'data' }
        }
      }
    }, 

    redirect: {
      login: '/backend/login',
      home: '/backend'
    }
    //watchLoggedIn: false
  },

  router: {
    //middleware: ['auth'],
    //redirect.login: '/backend/login'
    //base: process.env.NODE_ENV === "development" ? "/backend/" : "/backend/"
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
      admin: {
        httpEndpoint: process.env.VENDURE_ADMIN_URI,
        httpLinkOptions: {
          credentials: 'include'
        }
      }
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Mein-Taschenkalender.com', 
      short_name: 'Mein-Taschenkalender',
      description: 'Kalender und Notizbuch selbst gestalten',
      lang: 'de', 
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
