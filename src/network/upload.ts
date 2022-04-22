import axios from "./request";
import "@/components/upload/interface";

export function uploadMusic(data: UploadConfig, user_id: number) {
  return axios.post(`/private/${user_id}/upload`, data);
}
