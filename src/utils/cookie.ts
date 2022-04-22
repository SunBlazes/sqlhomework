export function setCookie(key: string, value: string, exdays: number): void {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 60 * 60 * 24 * 1000);
  const expires = "expires=" + d.toUTCString();
  key = encodeURIComponent(key);
  value = encodeURIComponent(value);
  document.cookie = `${key}=${value};${expires};path='/'`;
}

export function getCookie(key: string): string {
  key = key + "=";
  const decodeCookie = decodeURIComponent(document.cookie);
  const arr = decodeCookie.split(";");
  for (let i = 0; i < arr.length; i++) {
    const c = arr[i].trim();
    if (c.indexOf(key) !== -1) {
      return c.slice(key.length);
    }
  }
  return "";
}

export default {
  setCookie,
  getCookie
};
