import { collectionDeepMerge } from '@utils/deepMerge/collectionDeepMerge';

export const recursiveMergeArray = <P, S extends P>(source: S[], patch: P[], matchByKey: never): void => {
  patch.forEach((patchItem) => {
    const matchedSource = source.find(
      (sourceItem: S) => !!sourceItem[matchByKey] && sourceItem[matchByKey] === patchItem[matchByKey]
    );

    if (matchedSource) {
      collectionDeepMerge(matchedSource as never, patchItem as never, matchByKey);
    }
  });
};
