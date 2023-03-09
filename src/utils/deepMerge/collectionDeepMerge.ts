import { recursiveMergeArray } from '@utils/deepMerge/recursiveMergeArray';
import { recursiveMergeObject } from '@utils/deepMerge/recursiveMergeObject';

export const collectionDeepMerge = <P extends never, S extends P>(source: S, patch: P, matchByKey: never): S => {
  if (Array.isArray(patch)) {
    recursiveMergeArray(source, patch, matchByKey);
  } else if (typeof patch === 'object') {
    recursiveMergeObject(source, patch, matchByKey);
  }

  return source;
};
