export function horseRace() {
  const timer = setInterval(() => {
    const append = document.title[0];
    document.title = document.title.slice(1) + append;
  }, 1000);
  return timer;
}
