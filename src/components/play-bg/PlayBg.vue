<template>
  <div :class="`play-bg ${play_state ? '' : 'paused'}`">
    <span class="bg-ani1"></span>
    <span class="bg-ani2"></span>
    <span class="bg-ani3"></span>
    <span class="bg-ani4"></span>
    <span class="bg-ani5"></span>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PlayBg",
  computed: {
    ...mapState({
      play_state: state => state.play_state
    })
  }
};
</script>

<style scoped lang="less">
.play-bg {
  position: absolute;
  top: 60%;
  right: 20%;
  bottom: 80px;
  left: 20%;
  background-color: transparent;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  opacity: 1;
  transition: opacity 1s;
  &.paused {
    transition: none;
    opacity: 0;
    span {
      animation-play-state: paused;
    }
  }
  span {
    width: 70px;
    background-color: rgba(0, 0, 0, 0.1);
    display: inline-block;
    height: 100%;
    animation-play-state: running;
  }
  .bg-ani1 {
    height: 30%;
    animation-name: ani1;
    animation-duration: 0.7s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  .bg-ani2 {
    height: 60%;
    animation-name: ani2;
    animation-duration: 0.7s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-delay: 0.1s;
  }
  .bg-ani3 {
    height: 70%;
    animation-name: ani3;
    animation-duration: 0.5s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-delay: 0.2s;
  }
  .bg-ani4 {
    height: 50%;
    animation-name: ani4;
    animation-duration: 0.7s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-delay: 0.1s;
  }
  .bg-ani5 {
    height: 40%;
    animation-name: ani5;
    animation-duration: 0.7s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
  @keyframes ani1 {
    50% {
      height: 100%;
    }
  }
  @keyframes ani2 {
    50% {
      height: 100%;
    }
  }
  @keyframes ani3 {
    50% {
      height: 100%;
    }
  }
  @keyframes ani4 {
    50% {
      height: 100%;
    }
  }
  @keyframes ani5 {
    50% {
      height: 100%;
    }
  }
}
</style>
