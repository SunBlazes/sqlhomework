const state: State = {
  audio: null,
  music_url: "",
  play_state: 0,
  music_name: "",
  singer_name: "",
  playList: null,
  curr_index: -1,
  horseTimer: null
};

export interface State {
  audio: HTMLAudioElement | null;
  music_url: string;
  play_state: 0 | 1;
  music_name: string;
  singer_name: string;
  playList: Array<Music> | null;
  curr_index: number;
  horseTimer: number | null;
}

export default state;
