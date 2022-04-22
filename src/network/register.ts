import axios from "./request";

export function register(data: Register) {
  return axios.post("/user/register", data);
}

interface Register {
  code: string;
  username: string;
  userpwd: string;
  usermail: string;
}
