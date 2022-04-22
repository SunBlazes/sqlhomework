<template>
  <div class="not_found">
    <h1 class="title">404 NOT FOUND</h1>
    <h3 class="countdown">
      After
      <span class="curr">{{ countdown.currentSecond }}</span> SECONDS<br />
      PAGE AUTOMATICALLY REDIRECTS TO /LOGIN
    </h3>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

interface CountDown {
  currentSecond: number;
  totalSeconds: number;
}

@Component
export default class NotFound extends Vue {
  totalSeconds = 5;
  countdown: CountDown = {
    totalSeconds: this.totalSeconds,
    currentSecond: this.totalSeconds
  };

  mounted() {
    this.handleCountDown(() => {
      this.$router.replace("/");
    });
  }

  handleCountDown(cb: () => void) {
    setTimeout(() => {
      this.countdown.currentSecond--;
      if (this.countdown.currentSecond === 0) {
        cb();
      }
      this.handleCountDown(cb);
    }, 1000);
  }
}
</script>

<style scoped lang="less">
* {
  user-select: none;
}
.not_found {
  @color: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .title {
    font-size: 60px;
    font-weight: bold;
    background-image: @color;
    background-clip: text;
    color: transparent;
  }
  .countdown {
    text-align: center;
    background-image: @color;
    background-clip: text;
    color: transparent;
    line-height: 1.5;
    .curr {
      color: black;
      font-weight: bold;
    }
  }
}
</style>
