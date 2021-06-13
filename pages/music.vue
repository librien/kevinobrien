<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <Wavesurfer :src="currentSong" :mediaVolume="mediaVolume" ref="wavesurfer" />
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
          <v-btn @click="play" color="#848484" v-if="!isPlaying" small elevation="0" fab>
            <v-icon color="white" >mdi-play</v-icon>
          </v-btn>
          <v-btn @click="pause" color="#848484" v-if="isPlaying" small elevation="0" fab>
            <v-icon color="white" >mdi-pause</v-icon>
          </v-btn>
          <v-btn @click="nextSong" icon>
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
            @change="setVolume"
            thumb-label
          ></v-slider>

        </v-app-bar>
        <v-list two-line>
          <v-list-item>
            <v-list-item-icon>
              <v-btn icon>
                <v-icon v-show="isPlaying == false" color="black">
                  mdi-play
                </v-icon>
                <v-icon v-show="isPlaying == true" color="black">
                  mdi-pause
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
  import Wavesurfer from '~/components/Wavesurfer.vue';
  export default {
    components: { Wavesurfer },
    data() {
      return {
        mediaVolume: 75,
        isMounted: false,
        playlist: (function() {
          const albums = [
            {
              'Title': 'Scotia Major',
              'Songs': [
                {
                  'Title': '4 Yellow Sides',
                  'Url': 'http://localhost:3000/media/4yellowsides.mp3'
                },
                {
                  'Title': 'Facewave',
                  'Url': 'http://localhost:3000/media/facewave.mp3'
                }
              ]
            },
            {
              'Title': 'The Earth Spinning Years',
              'Songs': [
                {
                  'Title': 'Borrador',
                  'Url': 'http://localhost:3000/media/borrador.mp3'
                },
                {
                  'Title': 'Panopticon',
                  'Url': 'http://localhost:3000/media/panopticon.mp3'
                }
              ]
            }
          ]

          let playlist = [];
          albums.map(function (album) {
            album.Songs.map(function (song) {
              playlist.push(song);
            })
          })
          return playlist
        })(),
        currentSong: null
      }
    },
    computed: {
      isPlaying() {
        if (!this.isMounted) {
          return;
        }
        return this.$refs.wavesurfer.player.isPlaying();
      },
    },
    methods: {
      play: function (){
        this.$refs.wavesurfer.player.play();
      },
      pause: function (){
        this.$refs.wavesurfer.player.pause();
      },
      nextSong: function () {
        let wasPlaying = this.isPlaying;
        console.log(this.$refs.wavesurfer);
        this.$refs.wavesurfer.player.stop()
        this.setCurrentSong(this.playlist[this.playlist.indexOf(this.currentSong) + 1])
        if (wasPlaying) {
          this.$refs.wavesurfer.player.play()
        }
      },
      setVolume: function (){
        this.$refs.wavesurfer.player.setVolume(this.mediaVolume / 100);
      },
      setCurrentSong: function (newSong) {
        this.currentSong = newSong
        this.$refs.wavesurfer.player.load(newSong.Url)
      }
    },
    mounted(){
      this.isMounted = true;
      this.setCurrentSong(this.playlist[0]) // Load first song in playlist by default
    }
  }
</script>
<style scoped>
  .v-slider {
    max-width: 25% !important;
  }
</style>
