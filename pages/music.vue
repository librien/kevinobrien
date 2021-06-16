<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div>
        <Wavesurfer
          :src="currentSong"
          :mediaVolume="mediaVolume"
          ref="wavesurfer"
          style="background-color: rgba(0, 0, 0, 0.05)"
        />
        <v-progress-linear
          :value="loadValue"
          color="black"
          v-if="!isReady"
          style="top: -4px; margin-bottom: -4px"
        ></v-progress-linear>
      </div>
      <v-card class="mx-auto">
        <v-app-bar
          class="audio-controls"
          style="height: 54px !important"
          height="56px"
          dense
        >
          <v-btn @click="toggleShuffle" icon :color="getShuffleColor()">
            <v-icon>mdi-shuffle</v-icon>
          </v-btn>
          <v-btn @click="prevSong" icon>
            <v-icon>mdi-skip-previous</v-icon>
          </v-btn>
          <v-btn
            @click="play"
            color="#848484"
            v-if="!isPlaying"
            small
            elevation="0"
            fab
          >
            <v-icon color="white">mdi-play</v-icon>
          </v-btn>
          <v-btn
            @click="pause"
            color="#848484"
            v-if="isPlaying"
            small
            elevation="0"
            fab
          >
            <v-icon color="white">mdi-pause</v-icon>
          </v-btn>
          <v-btn @click="nextSong" icon>
            <v-icon>mdi-skip-next</v-icon>
          </v-btn>
          <v-btn @click="toggleRepeat" icon :color="getRepeatColor()">
            <v-icon v-if="repeat == 'off'">mdi-repeat</v-icon>
            <v-icon v-if="repeat == 'on'">mdi-repeat</v-icon>
            <v-icon v-if="repeat == 'once'">mdi-repeat-once</v-icon>
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
          <v-list-item v-for="song in this.playlist" :key="song.Title">
            <v-list-item-icon>
              <v-btn fab x-small @click="setCurrentSong(song, true)" elevation="0" v-if="song != currentSong">
                <v-icon color="black">
                  mdi-play
                </v-icon>
              </v-btn>
              <v-btn fab x-small @click="pause" elevation="0" v-if="song == currentSong && isPlaying == true">
                <v-icon color="black">
                  mdi-pause
                </v-icon>
              </v-btn>
              <v-btn fab x-small @click="play" elevation="0" v-if="song == currentSong && isPlaying == false">
                <v-icon color="black">
                  mdi-play
                </v-icon>
              </v-btn>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{song.Title}}</v-list-item-title>
              <v-list-item-subtitle>Length</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon>
              <v-btn icon>
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import Wavesurfer from "~/components/Wavesurfer.vue";
export default {
  components: { Wavesurfer },
  data() {
    let _this = this;
    return {
      mediaVolume: 75,
      isMounted: false,
      playlist: (function () {
        const albums = [
          {
            Title: "Scotia Major",
            Songs: [
              {
                Title: "4 Yellow Sides",
                Url: "http://localhost:3000/media/4yellowsides.mp3",
              },
              {
                Title: "Facewave",
                Url: "http://localhost:3000/media/facewave.mp3",
              },
            ],
          },
          {
            Title: "The Earth Spinning Years",
            Songs: [
              {
                Title: "Borrador",
                Url: "http://localhost:3000/media/borrador.mp3",
              },
              {
                Title: "Panopticon",
                Url: "http://localhost:3000/media/panopticon.mp3",
              },
            ],
          },
        ];
        let playlist = [];
        albums.map(function (album) {
          album.Songs.map(function (song) {
            playlist.push(song);
          });
        });
        return playlist;
      })(),
      songOrder: [],
      currentSong: null,
      isReady: false,
      loadValue: 0,
      shuffle: false,
      repeat: "off",
    };
  },
  computed: {
    isPlaying() {
      if (!this.isMounted) {
        return;
      }
      return this.$refs.wavesurfer.wavesurfer.isPlaying();
    },
  },
  methods: {
    init: function () {
      let _wavesurfer = this.$refs.wavesurfer.wavesurfer;
      this.$nextTick(() => {
        this.setCurrentSong(this.playlist[0], false); // Load first song in playlist by default
        this.songOrder = this.setSongOrder(false);
        this.onFinish(); // Is this negatively impacting performance?
      })
    },
    play: function () {
      let _wavesurfer = this.$refs.wavesurfer.wavesurfer;
      _wavesurfer.play();
    },
    pause: function () {
      let _wavesurfer = this.$refs.wavesurfer.wavesurfer;
      try {
        _wavesurfer.pause();
      } catch (error) {
        _wavesurfer.backend.setState("paused"); // Failed to execute 'stop'...
        console.error(error);
      }
    },
    onFinish: function () {
      let _wavesurfer = this.$refs.wavesurfer.wavesurfer;
      let _this = this;
      _wavesurfer.on("finish", function () {
        _this.nextSong(true, true);
      });
    },
    nextSong: function (wasPlaying, onFinish) {
      let _wavesurfer = this.$refs.wavesurfer.wavesurfer;
      if (this.isPlaying) {
        wasPlaying = true;
      }
      let currentIndex = this.songOrder.indexOf(this.songOrder.find(index => index == this.playlist.indexOf(this.currentSong)));
      let newIndex = null;
      if (this.repeat == 'once') {
        if (onFinish) {
          _wavesurfer.play();
          return;
        }
        else {
          this.repeat = 'on';
        }
      }
      if (currentIndex == this.playlist.length - 1) {
        // If nextSong() is being called from onFinish()
        if (onFinish) {
          // If repeat set to on then set new song index to first element in song order array
          if (this.repeat == 'on') {
            newIndex = this.songOrder[0];
          }
          else {
            newIndex = undefined;
          }
        }
        else {
          newIndex = this.songOrder[0];
        }
      } else {
        newIndex = this.songOrder[currentIndex + 1];
      }
      if (newIndex != undefined) {
        this.setCurrentSong(this.playlist[newIndex], wasPlaying);
      }
    },
    prevSong: function () {
      let _wavesurfer = this.$refs.wavesurfer.wavesurfer;
      let wasPlaying = false;
      if (this.isPlaying) {
        wasPlaying = true;
        //_wavesurfer.pause()
      }
      let currentIndex = this.playlist.indexOf(this.currentSong);
      let newIndex;
      if (currentIndex == 0) {
        newIndex = this.playlist.length - 1;
      } else {
        newIndex = currentIndex - 1;
      }
      this.setCurrentSong(this.playlist[newIndex]);
      _wavesurfer.on("ready", function () {
        if (wasPlaying) {
          _wavesurfer.play();
        }
      });
    },
    toggleShuffle: function () {
      this.shuffle = !this.shuffle;
      this.songOrder = this.setSongOrder(this.shuffle);
    },
    getShuffleColor: function () {
      if (this.shuffle) {
        return 'blue'
      }
      else {
        return 'black'
      }
    },
    toggleRepeat: function () {
      if (this.repeat == 'off') {
        this.repeat = 'on'
      }
      else if (this.repeat == 'on') {
        this.repeat = 'once'
      }
      else {
        this.repeat = 'off'
      }
    },
    getRepeatColor: function () {
      if (this.repeat == 'on' || this.repeat == 'once') {
        return 'blue'
      }
      else {
        return 'black';
      }
    },
    setSongOrder: function (shuffle) {
      let songOrder = [];
      for (let i = 0; i < this.playlist.length; i++) {
        songOrder.push(i);
      }
      if (!shuffle) {
        return songOrder;
      } else {
        function shuffleArray(array) {
          for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
          }
        }
        shuffleArray(songOrder);
        return songOrder;
      }
    },
    setVolume: function () {
      let _wavesurfer = this.$refs.wavesurfer.wavesurfer;
      _wavesurfer.setVolume(this.mediaVolume / 100);
    },
    getCurrentSong: function () {
      return this.currentSong;
    },
    setCurrentSong: function (newSong, wasPlaying) {
      let _wavesurfer = this.$refs.wavesurfer.wavesurfer;
      let _this = this;
      _this.isReady = false;
      _this.setLoadValue(0);
      this.currentSong = newSong;
      _wavesurfer.load(newSong.Url);
      _wavesurfer.on("loading", function (progress) {
        _this.setLoadValue(progress);
      });
      _wavesurfer.on("ready", function () {
        _this.isReady = true;
        if (wasPlaying) {
          _wavesurfer.play();
        }
      });
    },
    setLoadValue: function (progress) {
      this.loadValue = progress;
    },
  },
  mounted() {
    this.isMounted = true;
    this.init();
  },
};
</script>
<style scoped>
.v-slider {
  max-width: 25% !important;
}
</style>
