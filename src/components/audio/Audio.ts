import { Vue, Component, Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { ExtendChangeMusicPayload } from "@/store/modules/audio";
import { ElSlider } from "element-ui/types/slider";

interface Slider {
  value: number;
}

interface VolumnSlider extends Slider {
  timer: number | undefined;
  appear: boolean;
  disabled: boolean;
}

interface Play {
  timer: number;
  currTime: number;
  duration: number;
  forbidRight: boolean;
}

@Component
export default class Audio extends Vue {
  @State audio!: HTMLAudioElement;
  @State play_state!: 1 | 0;
  @State playList!: Array<ExtendChangeMusicPayload>;
  @State curr_index!: number;
  @Mutation changeState!: () => 0 | 1;
  @Mutation changeIndex!: (index: number) => void;
  @Mutation setSrc!: (payload: ExtendChangeMusicPayload) => void;
  slider: Slider = {
    value: 0
  };

  verticalSlider: VolumnSlider = {
    value: 0,
    appear: false,
    timer: undefined,
    disabled: true
  };

  $refs!: {
    volumn: ElSlider;
  };

  mounted() {
    this.audio.oncanplay = () => {
      this.audio.play();
      this.handlePlay();
    };
    this.audio.onended = () => {
      this.handleAudioEnded();
    };
    this.$bus.$on("resetTime", this.resetTime);
  }

  resetTime() {
    this.play.duration = 0;
    this.play.currTime = 0;
    clearInterval(this.play.timer);
    this.play.forbidRight = false;
  }

  play: Play = {
    timer: -1,
    currTime: -1,
    duration: -1,
    forbidRight: false
  };

  handleAudioEnded() {
    let curr_index = this.curr_index + 1;
    if (curr_index >= this.playList.length) {
      curr_index = 0;
      this.changeIndex(curr_index);
      this.setSrc(this.playList[0]);
      return;
    }
    this.changeIndex(curr_index);
    this.playList[curr_index].index = curr_index;
    this.setSrc(this.playList[curr_index]);
  }

  parseIntoPayload(res: Array<Music>): Array<ExtendChangeMusicPayload> {
    const playlist = [] as Array<ExtendChangeMusicPayload>;
    res.forEach((music, index) => {
      const { music_name, music_url, singer_name } = music;
      playlist.push({
        music_name,
        singer_name,
        music_url,
        index
      });
    });
    return playlist;
  }

  handlePlay() {
    const audio = this.audio;
    this.play.duration = audio.duration;
    this.handlePlaying(audio);
  }

  onMouseDown() {
    this.play.forbidRight = true;
  }

  onMouseUp() {
    setTimeout(() => {
      this.play.forbidRight = false;
    }, 1000);
  }

  handlePlaying(audio: HTMLAudioElement) {
    this.play.timer = setInterval(() => {
      this.play.currTime = audio.currentTime;
      this.handleProgressChange();
    }, 1);
  }

  handleProgressChange() {
    const { currTime, duration } = this.play;
    if (!this.play.forbidRight) {
      this.slider.value = (currTime / duration) * 100;
    }
  }

  handleMouseProgressChange(value: number) {
    value = value / 100;
    const currTime = this.play.duration * value;
    this.play.currTime = currTime;
    this.audio.currentTime = currTime;
  }

  @Watch("play_state")
  onStateChange(v: 0 | 1) {
    if (v) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  @Watch("curr_index")
  onCurr_indexChange(v: number) {
    if (v !== -1 && this.verticalSlider.disabled) {
      this.verticalSlider.disabled = false;
    }
    this.verticalSlider.value = this.audio.volume * 100;
  }

  onChangeState() {
    const play_state = this.play_state === 1 ? 0 : 1;
    this.changeState();
    if (play_state) {
      if (this.curr_index === -1) {
        if (!this.playList) {
          this.$message({
            type: "warning",
            message: "播放列表为空",
            duration: 1000
          });
          this.changeState();
        } else {
          this.changeIndex(this.curr_index + 1);
          this.playList[this.curr_index].index = this.curr_index;
          this.setSrc(this.playList[this.curr_index]);
        }
      }
    } else {
      this.audio.pause();
    }
  }

  parseTime(time: number) {
    const minute = Math.floor(time / 60);
    let second = parseInt(time - minute * 60 + "") + "";
    second = second.padStart(2, "0");
    return minute + ":" + second;
  }

  get duration() {
    if (this.play.currTime === -1) {
      return this.parseTime(0);
    }
    return this.parseTime(this.play.duration);
  }

  get curr_time() {
    if (this.play.currTime === -1) {
      return this.parseTime(0);
    }
    return this.parseTime(this.play.currTime);
  }

  handleVolumnDisappear() {
    this.verticalSlider.timer = undefined;
    this.verticalSlider.timer = setTimeout(() => {
      this.verticalSlider.appear = false;
    }, 3000);
  }

  volumnSliderEnter() {
    const vSlider = this.verticalSlider;
    if (vSlider.timer !== undefined) {
      clearTimeout(vSlider.timer);
      vSlider.timer = undefined;
    }
    this.verticalSlider.appear = true;
  }

  handleVolumnChange(value: number) {
    this.audio.volume = value / 100;
  }
}
