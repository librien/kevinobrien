<template>
  <div id="waveform"></div>
</template>
<script>
import WaveSurfer from "wavesurfer.js";
export default {
  data() {
    return {
      isLoading: false,
      wavesurfer: null
    };
  },
  props: ["src"],
  async mounted() {
    if (!this.wavesurfer) this.createWaveSurfer();
    if (this.src) {
      this.wavesurfer.load(this.src.Url);
    }
  },
  methods: {
    createWaveSurfer() {
      this.wavesurfer = WaveSurfer.create({
        container: "#waveform",
        hideScrollbar: true,
      });
      this.wavesurfer.on("error", err => {
        console.error(err);
      });
    },
  },
  computed: {
    
  },
};
</script>