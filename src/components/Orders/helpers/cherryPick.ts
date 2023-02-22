import { cherryPickByArray } from './cherryPickByArray';
import { cherryPickByObject } from './cherryPickByObject';

export const cherryPick = <C, T>(
  source: T,
  keysToExport: string[],
  checkByProperty?: string,
  checkerCallback: (object: C) => boolean = () => true
): T | null => {
  if (!source) {
    return null;
  }

  if (typeof source === 'object') {
    if (Array.isArray(source)) {
      return cherryPickByArray(cherryPick, source, keysToExport, checkByProperty, checkerCallback);
    }

    // @ts-ignore
    return cherryPickByObject(cherryPick, source, keysToExport, checkByProperty, checkerCallback) as T;
  }

  return null;
};
