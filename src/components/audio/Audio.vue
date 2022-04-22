<template>
  <div class="audio">
    <div class="audio-wrapper">
      <!-- <div class="info">5</div> -->
      <el-slider
        v-model="slider.value"
        @change="handleMouseProgressChange"
        @mousedown.native="onMouseDown"
        @mouseup.native="onMouseUp"
      ></el-slider>
      <div class="time">{{ curr_time }} / {{ duration }}</div>
      <div class="btn" @click="onChangeState">
        <i class="iconfont icon-bofang1" v-if="!play_state"></i>
        <i class="iconfont icon-zantingtingzhi" v-else></i>
      </div>
      <div class="volumn">
        <el-slider
          v-model="verticalSlider.value"
          :class="`volumn-slider ${verticalSlider.appear ? 'appear' : ''}`"
          vertical
          height="70px"
          input-size="mini"
          ref="volumn"
          @mouseenter.native="volumnSliderEnter"
          @mouseleave.native="handleVolumnDisappear"
          :disabled="verticalSlider.disabled"
          @change="handleVolumnChange"
        ></el-slider>
        <i
          class="iconfont icon-B"
          @mouseenter="volumnSliderEnter"
          @mouseleave="handleVolumnDisappear"
        ></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Audio from "./Audio";
export default Audio;
</script>

<style scoped lang="less">
.audio {
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  .audio-wrapper {
    width: 70%;
    min-width: 700px;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-slider {
      width: 70%;
      display: inline-block;
      margin-right: 20px;
    }
    .iconfont {
      font-size: 25px;
      color: white;
      cursor: pointer;
      margin-left: 5px;
      margin-right: 10px;
      &:hover {
        color: orange;
      }
    }
    .volumn {
      position: relative;
      .volumn-slider {
        position: absolute;
        top: -80px;
        left: -5%;
        display: none;
        &.appear {
          display: block;
        }
      }
    }
  }
}
</style>
