<template>
    <wavesurfer :src="file" :options="options" style="background-color: rgba(0,0,0,.05)" ref="surf"></wavesurfer>
</template>
<script>
export default {
  mounted() {
    this.player.on('ready', () => {
    })
  },
  computed: {
    player() {
      return this.$refs.surf.waveSurfer
    }
  },
  data() {
    return {
        options: {},
        file: "http://localhost:3000/media/facewave.mp3",
        };
    },
}
</script>