import { Vue, Component } from "vue-property-decorator";
import { getUserMusic } from "@/network/getUserMusic";
import { getCookie } from "@/utils/cookie";
import { parseDate } from "@/utils/parseDate";
import { State, Mutation } from "vuex-class";
import { deleteUserMusic } from "@/network/deleteUserMusic";
import { ExtendChangeMusicPayload } from "@/store/modules/audio";

interface Pagination {
  layout: string;
  currentPage: number;
  total: number;
  pageSizes: Array<number>;
  pageSize: number;
}

@Component
export default class MyMusic extends Vue {
  name = "MyMusic";
  returnData: Array<Music> = [];
  user_id = -1;
  parseDate = parseDate;
  pagination: Pagination = {
    pageSizes: [1, 2, 3],
    layout: "sizes, prev, pager, next",
    total: -1,
    currentPage: 1,
    pageSize: 3
  };

  @State audio!: HTMLAudioElement;
  @State play_state!: 0 | 1;
  @Mutation setSrc!: (payload: ExtendChangeMusicPayload) => void;
  @Mutation setPlaylist!: (payload: Array<Music>) => void;
  @Mutation changeState!: () => void;
  @Mutation setState!: (payload: 0 | 1) => {};
  @State playList!: Array<Music>;

  mounted() {
    this.user_id = parseInt(getCookie("user_id"));
    this.getUserMusic({
      limit: this.pagination.pageSize
    });
  }

  async getUserMusic(query?: QueryParams) {
    if (this.user_id === -1) return;
    const data = await getUserMusic(this.user_id, query);
    const res = data.data;
    const result = res.result;
    this.setPlaylist(result.musicArr as Array<Music>);
    if (this.pagination.total === -1) {
      this.pagination.total = result.total;
    }
  }

  async handlePlay(
    music_url: string,
    music_name: string,
    singer_name: string,
    index: number
  ) {
    const curr_index = this.$store.state.curr_index;
    if (
      curr_index === -1 ||
      this.playList[index].music_id === this.playList[curr_index].music_id
    ) {
      this.changeState();
    } else {
      this.setState(1);
    }
    if (curr_index === -1) {
      this.setState(1);
    }
    if (index !== curr_index && this.$store.state.music_name !== music_name) {
      const payload = {
        music_url,
        music_name,
        singer_name,
        index
      };
      this.setSrc(payload);
    }
  }

  handleSizeChange(limit: number) {
    let offset = (this.pagination.currentPage - 1) * limit;
    if (offset >= this.pagination.total) {
      offset = 0;
    }
    const query: QueryParams = {
      offset,
      limit
    };
    if (this.play_state) {
      // this.$bus.$emit("resetTime");
      this.$store.commit("changeIndex", -1);
      // this.changeState();
    }
    this.getUserMusic(query);
  }

  handleCurrentChange(pagenum: number) {
    const offset = this.pagination.pageSize * (pagenum - 1);
    const query: QueryParams = {
      offset,
      limit: this.pagination.pageSize
    };
    if (this.play_state) {
      // this.$bus.$emit("resetTime");
      this.$store.commit("changeIndex", -1);
      // this.changeState();
    }
    this.getUserMusic(query);
  }

  async deleteMusic(music_id: number) {
    if (this.user_id !== -1) {
      await deleteUserMusic({
        user_id: this.user_id,
        music_id
      });
      this.$message({
        type: "success",
        message: "删除歌曲成功",
        duration: 1000,
        onClose: () => {
          this.getUserMusic();
        }
      });
    }
  }

  async openDeleteBox(music_id: number) {
    let res;
    try {
      res = await this.$confirm("此操作将永久删除歌曲, 是否继续?", "提示");
    } catch (error) {
      console.log(error);
    }
    if (res === "confirm") {
      await this.deleteMusic(music_id);
    }
  }
}
