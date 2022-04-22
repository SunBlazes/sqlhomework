import axios from "./request";

export function login(data: Login) {
  return axios.post("/user/login", data);
}

interface Login {
  username: string;
  userpwd: string;
}
