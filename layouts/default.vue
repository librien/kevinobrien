<template>
  <v-app>
    <Navbar :onScroll="onScroll"/>
    <v-main>
      <Overlay />
      <v-container style="margin-top: 64px;">
        <nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Overlay from '../components/Overlay.vue'
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Music',
          to: '/music'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  },
  methods: {
    onScroll (e) {
      if (typeof window === 'undefined') return;
      const top = window.pageYOffset ||   e.target.scrollTop || 0;
      this.fab = top > 20;
    }
  },
  components: {
    Navbar,
    Overlay,
    Footer
  }
}
</script>
