import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - kevinobrien',
    title: 'kevinobrien',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    //"~/plugins/wavesurfer.js-vue"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/firebase',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
    "vue2-editor/nuxt"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Firebase module configuration
  firebase: {
    config: {
      apiKey: "AIzaSyA-FbX_fGENtwqror1k1UmdIoozXvycRNg",
      authDomain: "kevinobrien-dev.firebaseapp.com",
      databaseURL: "https://kevinobrien-dev-default-rtdb.firebaseio.com",
      projectId: "kevinobrien-dev",
      storageBucket: "kevinobrien-dev.appspot.com",
      messagingSenderId: "808556729269",
      appId: "1:808556729269:web:0bada481a15a30d16dfffc",
      measurementId: "G-4QZMBGH8WB"
    },
    services: {
      auth: true,
      storage: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
