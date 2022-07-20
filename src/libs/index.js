export function animeFinished(anime) {
  let resolveFn;
  const p = new Promise((resolve) => {
    resolveFn = resolve;
  });
  anime.update = (a) => {
    if (a.progress === (a.reversed ? 0 : 100)) {
      resolveFn(a);
    }
  };
  return p;
}
