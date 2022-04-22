import axios from "./request";

export function deleteUserMusic(data: DeleteUserMusic) {
  return axios.delete("/private/delete_user_music", {
    data
  });
}
