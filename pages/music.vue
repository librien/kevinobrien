<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <wavesurfer :src="file" :options="options" style="background-color: rgba(0,0,0,.05)"></wavesurfer>
      <v-card
        class="mx-auto"
      >
        <v-img
          src="https://cdn.vuetifyjs.com/images/lists/ali.png"
          height="300px"
          dark
        >
          <v-row class="fill-height">
            <v-card-title>
            </v-card-title>

          </v-row>
        </v-img>

        <v-list two-line>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="black">
                mdi-play
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Song Title</v-list-item-title>
              <v-list-item-subtitle>Length</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon>mdi-message-text</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
  export default {
    data() {
      return {
        options: {},
        file: "http://localhost:3000/media/facewave.mp3",
      };
    },
  }
</script>
