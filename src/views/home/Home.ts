import { Component, Vue } from "vue-property-decorator";
import { getCookie } from "@/utils/cookie";
import "./interface";
import MyAudio from "@/components/audio/Audio.vue";
import PlayBg from "@/components/play-bg/PlayBg.vue";
@Component({
  components: {
    MyAudio,
    PlayBg
  }
})
export default class Home extends Vue {
  name = "Home";
  user_id = -1;
  user_name = "";
  menu: Menu = {
    isCollapsed: false,
    defaultActive: "0",
    indexArr: ["0", "1"],
    defaultOpeneds: []
  };

  mounted() {
    this.init();
    const $route = this.$route;
    if ($route.name === "upload" || $route.name === "my") {
      this.menu.defaultOpeneds.push("0");
    } else {
      if ($route.name === "music_bank") {
        this.menu.defaultOpeneds.push("1");
      }
    }
  }

  init() {
    this.user_id = parseInt(getCookie("user_id")!);
    this.user_name = getCookie("user_name")!;
  }
}
