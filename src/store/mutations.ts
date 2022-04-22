import { State } from "./state";
import { ExtendChangeMusicPayload } from "./modules/audio";
import { addListen_count } from "@/network/addListen_count";
import { horseRace } from "@/utils/horseRace";

const mutations = {
  async setSrc(state: State, payload: ExtendChangeMusicPayload) {
    const { music_url, music_name, singer_name, index } = payload;
    state.audio!.src = "";
    state.audio!.src = music_url;
    state.music_name = music_name;
    state.singer_name = singer_name;
    state.curr_index = index;
    state.playList![index].listen_count++;
    await addListen_count({ music_id: state.playList![index].music_id });
    document.title = `${singer_name} - ${music_name} - `;
  },
  setAudio(state: State, payload: HTMLAudioElement) {
    state.audio! = payload;
  },
  changeState(state: State) {
    if (state.play_state) {
      state.play_state = 0;
      clearInterval(state.horseTimer!);
    } else {
      state.play_state = 1;
      state.horseTimer = horseRace();
    }
    return state.play_state;
  },
  setState(state: State, payload: 0 | 1) {
    state.play_state = payload;
  },
  setPlaylist(state: State, payload: Array<Music>) {
    state.playList = payload;
  },
  changeIndex(state: State, payload: number) {
    state.curr_index = payload;
  },
  sortList(state: State, payload: string) {
    if (payload === "desc") {
      state.playList!.sort((x, y) => {
        return y.listen_count - x.listen_count;
      });
    } else {
      if (payload === "asc") {
        state.playList!.sort((x, y) => {
          return x.listen_count - y.listen_count;
        });
      }
    }
  }
};

export default mutations;
