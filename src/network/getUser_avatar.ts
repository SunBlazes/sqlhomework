import axios from "./request";

export function getUser_avatar(user_id: number) {
  return axios.get(`/private/${user_id}/avatar`);
}
