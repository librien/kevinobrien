<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6" v-if="playlist">
      <audio-player :playlist="playlist" ></audio-player>
    </v-col>
  </v-row>
</template>
<script>
import AudioPlayer from "~/components/AudioPlayer.vue";

export default {
  components: { AudioPlayer },
  created() {
    this.getSongs();
  },
  data() {
    return {
      songs: null,
      playlist: null,
    };
  },
  methods: {
    getSongs: async function () {
      const url = `https://kevinobrien-dev-default-rtdb.firebaseio.com/songs.json`;
      this.songs = await this.$axios.$get(url);
      this.playlist = Object.values(JSON.parse(JSON.stringify(this.songs)))
    },
  },
  mounted() {
    
  },
};
</script>

