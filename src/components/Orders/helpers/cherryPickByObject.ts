import { pick } from './pick';

export const cherryPickByObject = <C, V, T extends Record<string, V> & C>(
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
  if (!!source && checkByProperty && Object.hasOwn(source, checkByProperty)) {
    return checkerCallback(source) ? pick(source, keysToExport) : null;
  }

  const result: Record<string, V> = {};
  const keys = Object.keys(source);

  keys.forEach((key) => {
    const picked = cherryPick(source[key], keysToExport, checkByProperty, checkerCallback);

    if (picked) {
      result[key] = picked;
    }
  });

  if (Object.keys(result).length) {
    return { ...pick(source, keysToExport), ...result };
  }

  return null;
};
