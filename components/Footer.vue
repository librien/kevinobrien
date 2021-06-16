<template>
  <v-footer absolute app>
    <v-container>
      <v-row justify="center" align="center">
        <v-col
          cols="12"
          sm="8"
          md="6"
          style="padding-top: 0px; padding-bottom: 0px"
        >
          <span style="font-size: .7rem;">&copy; {{ new Date().getFullYear() }} Kevin O'Brien</span>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
<style lang="scss" scoped>
.v-footer.theme--light.v-sheet {
  background-color: rgba(255, 255, 255, 0.75) !important;
  color: black;
}
</style>