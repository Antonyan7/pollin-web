import { collectionDeepMerge } from '@utils/deepMerge/collectionDeepMerge';

export const recursiveMergeObject = <P extends never, S extends P>(source: S, patch: P, matchByKey: never): void => {
  const patchKeys = Object.keys(patch);

  patchKeys.forEach((key) => {
    if (typeof source[key] === 'object') {
      collectionDeepMerge(source[key], patch[key], matchByKey);
    } else {
      source[key] = patch[key];
    }
  });
};
