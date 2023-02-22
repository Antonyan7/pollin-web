export const cherryPickByArray = <C, V, T extends Array<V>>(
  cherryPick: (
    source: V,
    keysToExport: string[],
    checkByProperty?: string,
    checkerCallback?: (object: C) => boolean
  ) => V | null,
  source: T,
  keysToExport: string[],
  checkByProperty?: string,
  checkerCallback: (object: C) => boolean = () => true
): T | null => {
  const result: Array<V> = [];

  source.forEach((element: V) => {
    const picked: V | null = cherryPick(element, keysToExport, checkByProperty, checkerCallback);

    if (picked) {
      result.push(picked);
    }
  });

  return result.length ? (result as T) : null;
};
