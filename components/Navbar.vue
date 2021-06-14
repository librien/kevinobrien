<template>
    <v-app-bar
      fixed
      elevate-on-scroll
      v-scroll="onScroll"
      :style="{'background-color':bgColor}"
      scroll-target=""
      style="padding-bottom:0px;"
    >
      <v-container>
        <v-row justify="center" align="center">
          <v-col cols="12" sm="8" md="6" style="padding-top: 0px; padding-bottom: 0px;">
            <v-tabs
              background-color="transparent"
              color="black"
              grow
            >
              <ko-logo></ko-logo>
              <v-tab
                to="/"
                nuxt>
                Home
              </v-tab>
              <v-tab
                to="/code"
                nuxt>
                Code
              </v-tab>
              <v-tab
                to="/music"
                nuxt>
                Music
              </v-tab>
              <v-tab
                to="/about"
                nuxt>
                About
              </v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
</template>
<script>
  import KoLogo from './KoLogo.vue'
  export default {
    components: { KoLogo },
    data () {
      return {
        bgColor: "rgba(255,255,255,0)",
      }
    },
    methods: {
      onScroll (e) {
        if (typeof window === 'undefined') return;
        const top = window.pageYOffset ||   e.target.scrollTop || 0;
        if (top == 0) {
          this.bgColor = "rgba(255,255,255,0)";
        }
        else if (top > 64) {
          this.bgColor = "rgba(255,255,255,1)";
        }
        else {
          this.bgColor = `rgba(255,255,255,${top/64})`;
        }
      }
    },
  }
</script>
<style>
.v-toolbar__content {
  padding-bottom: 0px;
  padding-top: 0px;
}
.v-tabs {
  height: 64px;
}
.v-item-group {
  height: 64px;
}
</style>