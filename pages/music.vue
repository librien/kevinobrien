<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <wavesurfer :src="file" :options="options" style="background-color: rgba(0,0,0,.05)"></wavesurfer>
      <v-card
        class="mx-auto"
      >
        <v-app-bar class="audio-controls" style="height: 54px !important"
          height="56px"
          dense
        >
          <v-btn icon>
            <v-icon>mdi-shuffle</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-skip-previous</v-icon>
          </v-btn>
          <v-btn color="#848484" small elevation="0" fab>
            <v-icon color="white">mdi-play</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-skip-next</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-repeat</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-slider
            v-model="mediaVolume"
            color="black"
            track-color="grey"
            dense
            append-icon="mdi-volume-high"
            hide-details="true"
            thumb-label
          ></v-slider>

        </v-app-bar>
        <!--
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
        -->
        <v-list two-line>
          <v-list-item>
            <v-list-item-icon>
              <v-btn icon>
                <v-icon color="black">
                  mdi-play
                </v-icon>
              </v-btn>
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
        mediaVolume: 75,
        options: {},
        file: "http://localhost:3000/media/facewave.mp3",
      };
    },
  }
</script>
<style scoped>
  .v-slider {
    max-width: 25% !important;
  }
</style>
