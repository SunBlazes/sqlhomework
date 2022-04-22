export class Validator {
  private caches: Function[] = [];
  setValidate(dom: HTMLInputElement, patterns: Pattern[]) {
    patterns.forEach(pattern => {
      let { rule, trigger, fn } = pattern as Pattern;
      trigger = trigger.startsWith("on") ? trigger.slice(2) : trigger;
      const verify = function(): boolean {
        if (rule instanceof RegExp) {
          fn(rule.test(dom.value));
          return rule.test(dom.value);
        } else {
          fn(dom.value === rule.value && dom.value);
          return (dom.value === rule.value && dom.value) as boolean;
        }
      };
      this.caches.push(verify);
      dom.addEventListener(trigger, verify);
    });
  }

  verifyAll() {
    let flag = true;
    this.caches.forEach(cache => {
      const res: boolean = cache();
      if (flag) {
        flag = res;
      }
    });
    return flag;
  }
}

interface Pattern {
  rule: RegExp | HTMLInputElement;
  trigger: string;
  fn: Function;
}
