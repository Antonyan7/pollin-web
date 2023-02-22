import keyBy from 'lodash.keyby';
import merge from 'lodash.merge';
import values from 'lodash.values';
import { IOrderTypesCollection } from 'types/reduxTypes/ordersStateTypes';

export const collectionDeepMerge = (
  mainCollection: IOrderTypesCollection[],
  mergeCollection: IOrderTypesCollection[],
  fieldName: string
) =>
  values(merge(keyBy(structuredClone(mainCollection), fieldName), keyBy(structuredClone(mergeCollection), fieldName)));
