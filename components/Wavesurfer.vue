<template>
  <wavesurfer
    :src="file"
    :options="options"
    style="background-color: rgba(0, 0, 0, 0.05)"
    ref="surf"
  ></wavesurfer>
</template>
<script>
export default {
  props: ["src"],
  mounted() {
    console.log(this.src);
    console.log(this);
    this.player.on("ready", () => {});
    this.file = this.src.get().Url;
    console.log(this.src);
  },
  computed: {
    player() {
      return this.$refs.surf.waveSurfer;
    },
  },
  data() {
    return {
      options: {},
      file: null,
    };
  },
};
</script>