interface FormRule {
  trigger: string;
  fn: (valid: boolean) => void;
  el: HTMLInputElement;
  reg: RegExp;
}

export class Validator {
  cached: Array<FormRule> = [];
  cachedFn: Array<() => boolean> = [];

  push(item: FormRule) {
    this.cached.push(item);
  }

  validifyAll() {
    if (this.cached.length !== 0) {
      this.cached.forEach(cache => {
        const { trigger, fn, el, reg } = cache;
        const verify = (): boolean => {
          let flag = true;
          el.addEventListener(trigger, () => {
            if (el.value) {
              flag = reg.test(el.value);
              fn(flag);
            }
          });
          return flag;
        };
        this.cachedFn.push(verify);
      });
    }
  }

  verfifyAll(): boolean {
    let valid = true;
    if (this.cached.length !== 0) {
      this.cachedFn.forEach(fn => {
        if (!fn() && valid) {
          valid = false;
        }
      });
    }
    return valid;
  }
}
