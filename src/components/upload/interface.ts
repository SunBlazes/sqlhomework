interface UploadConfig {
  music_name: string;
  cat_id: string | null;
  music_url: string;
  lyric_url: string | null;
  singer_name: string;
}

interface RuleItem {
  validator?: Validator;
  required?: boolean;
  message?: string;
  trigger: string;
}

interface Rule {
  [index: string]: Array<RuleItem>;
}

type Validator = (
  rule: RegExp,
  value: string | number,
  callback: Function
) => void;

interface Reg {
  [index: string]: RegExp;
}
