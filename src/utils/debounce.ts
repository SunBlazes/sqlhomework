export function debounce(handler: Function, delay: number) {
  let timer: number | null = null;
  return function(e: InputEvent) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      handler(e);
    }, delay);
  };
}
