import axios, { AxiosResponse } from "axios";
import router from "@/router";
import { setCookie } from "@/utils/cookie";

axios.defaults.baseURL = "http://127.0.0.1:8001";

axios.interceptors.request.use(
  config => {
    if (config.url?.indexOf("private") !== -1) {
      config.headers.Authorization = sessionStorage.getItem("token");
      return config;
    }
    return config;
  },
  err => {
    return Promise.reject(err.message);
  }
);

function resetInfo() {
  setCookie("user_id", "sss", -1);
  setCookie("user_name", "sss", -1);
  sessionStorage.removeItem("token");
}

axios.interceptors.response.use(
  function(response: AxiosResponse) {
    // console.log(response);
    const { config, data } = response;
    const url = config.url;
    // if (url?.indexOf("private") !== -1) {
    //   const _data = data as RequestReturnType;
    //   if (_data.meta.status !== 200) {
    //     resetInfo();
    //     router.replace("/");
    //   }
    // }
    return response;
  },
  err => {
    return Promise.reject(err.message);
  }
);

export default axios;
