export default {

  publicRuntimeConfig: {
    designerurl: process.env.DESIGNER_URL,
    epicalapi_url: process.env.EPICALAPI_URL,
    epicalapi_login: process.env.EPICALAPI_LOGIN,
    vendure_admin_login: process.env.VENDURE_ADMIN_LOGIN,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Personliga almanackor och anteckningsböcker | Epical.me',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Hos Epical.se skapar du personliga almanackor, kalendrar eller anteckningböcker. Designa ditt omslag, skräddarsy innehållet och lägg till moduler.' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    script: [ 
      {
        //<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="029c6520-4566-47c2-a80b-22b6641d1ef4" data-blockingmode="auto" type="text/javascript"></script>
        src: "https://consent.cookiebot.com/uc.js",
        'data-cbid': "029c6520-4566-47c2-a80b-22b6641d1ef4",
        'data-blockingmode': "auto",
        //async: false
      },
      //<script type="text/javascript">!function(e,t,n){function a(){var e=t.getElementsByTagName("script")[0],n=t.createElement("script");n.type="text/javascript",n.async=!0,n.src="https://beacon-v2.helpscout.net",e.parentNode.insertBefore(n,e)}if(e.Beacon=n=function(t,n,a){e.Beacon.readyQueue.push({method:t,options:n,data:a})},n.readyQueue=[],"complete"===t.readyState)return a();e.attachEvent?e.attachEvent("onload",a):e.addEventListener("load",a,!1)}(window,document,window.Beacon||function(){});</script>
      /* jetzt in default.vue
      {
        src: '/scripts/helpbeacon.js',
        body:true
      },
      //<script type="text/javascript">window.Beacon('init', 'c873c74a-8b69-496d-9416-364983a832c7')</script>
      {
        src: '/scripts/helpbeacon2.js',
        body:true
      }
      */
      
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
    { 
      src: '~/plugins/globalFunctions.js',
      //src: '~/plugins/axios.js'
    }
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

    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',

    // GoogleTagManager https://morioh.com/p/e41edc2bbdaf
    '@nuxtjs/gtm',

    ['nuxt-stripe-module', {
      //publishableKey: 'pk_test_51L851ZKeMy0OEQsmGXVMkBtpOP2kDRrLieecaVcVxcAFWxM8dmHZIvMYA868imYcPRU5B5G7NwBe8ds74BLe248Q00dFBMl65F',
      //publishableKey: 'pk_test_51JD74vKtd6Df5K5e80kaExqOQvMPiaZB3sNwGk4uhYCPhzKFRZEY2sbFUGzqRroslNOkdyNH9fPujs4AOg8Nzq3c007EG8jsdK',
      publishableKey: 'pk_live_51L851ZKeMy0OEQsma6I41LDLSg5ptaC1kgLSN9KOL3m71qmeRMO4x5S0o8KdW0FjXEaIog4UTqkqz5qgjI857q1T003013d5e5'
    }],

  ],

  // Google Tag Manager Settings
  gtm: {
    enabled:true,
    id: 'GTM-5LQV29W'
  },

  // Fontloader configuration
  fontLoader: {
    url: '/fonts/fonts.css'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.EPICALAPI_URL,
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
      name: 'Epical.me - Din personlig Kalender', 
      short_name: 'Epical.me',
      description: 'Personliga almanackor och anteckningsböcker',
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
