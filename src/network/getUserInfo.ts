import axios from "./request";

export function getUserInfo(userid: number) {
  return axios.get(`/private/${userid}/info`);
}
