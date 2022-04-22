import axios from "./request";

export function getUserMusic(user_id: number, query?: QueryParams) {
  return axios.get(`/private/${user_id}/user-music`, {
    params: query
  });
}
