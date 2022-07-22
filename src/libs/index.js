export function animeFinished(anime) {
  let { update } = anime;
  update = update || (() => {});
  const originUpdate = anime.originUpdate = anime.originUpdate || update;
  let resolveFn;
  const p = new Promise((resolve) => {
    resolveFn = resolve;
  });
  anime.update = (a) => {
    originUpdate(a);
    if (a.progress === (a.reversed ? 0 : 100)) {
      resolveFn(a);
    }
  };
  return p;
}
