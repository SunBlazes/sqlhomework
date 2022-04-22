import axios from "./request";

export function addListen_count(payload: { music_id: number }) {
  return axios.put("/private/addListen_count", payload);
}
