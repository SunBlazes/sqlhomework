import axios from "./request";

export function updateUserInfo(
  userid: number,
  body: { [index: string]: string }
) {
  return axios.put(`/private/${userid}/update/info`, body);
}
