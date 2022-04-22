<template>
  <div id="app">
    <router-view />
    <audio src="" ref="audio"></audio>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      audio: null
    };
  },
  mounted() {
    this.$store.commit("setAudio", this.$refs.audio);
    this.audio = this.$store.state.audio;
  }
});
</script>

<style lang="less">
@import "assets/css/global.css";
@import "//at.alicdn.com/t/font_1798435_e83xd9lm2dd.css";
</style>
