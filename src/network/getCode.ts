import axios from "./request";

export function getCode(data: Code) {
  return axios.get("/getCode", {
    params: data
  });
}

interface Code {
  mail: string;
}
