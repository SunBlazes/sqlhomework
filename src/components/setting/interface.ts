declare interface MyReturnType extends RequestReturnType {
  result: {
    avatar: string;
    user_id: number;
  };
}

interface Avatar {
  avatar_url: string;
  isLoaded: boolean;
}

interface FormItem {
  value: string;
  isCorrect: boolean;
  isNeeded: boolean;
  el: HTMLInputElement | null;
  reg: RegExp;
}

interface Form {
  [index: string]: FormItem;
}

interface Upload {
  fileList: Array<FileInfo>;
  limit: number;
  autoUpload: boolean;
  onExceed: () => void;
  accept: Array<string>;
}

interface FileInfo {
  name: string;
  url: string;
}
