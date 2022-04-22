declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare interface RequestReturnType {
  result?: object | Array<object>;
  meta: {
    status: number;
    msg: string;
  };
}

declare interface LoginReturnType extends RequestReturnType {
  result: {
    token: string;
    user_id: number;
    user_name: string;
  };
}

declare interface Music {
  cat_id: number;
  music_url: string;
  lyric_url: string | null;
  music_id: number;
  music_name: string;
  singer_id: number;
  singer_name: string;
  user_id: number;
  add_time: number;
  listen_count: number;
}

declare interface QueryParams {
  limit?: number;
  offset?: number;
}

declare interface DeleteUserMusic {
  music_id: number;
  user_id: number;
}

declare interface UserBasicInfo {
  user_name: string;
  user_pwd: string;
  user_email: string;
}
