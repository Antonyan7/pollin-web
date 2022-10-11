import { IUniqueItem } from 'types/reduxTypes/booking';

import { OptionsReturnProps } from '../types/create-schedule';

export const createOptionsGroup = <T extends IUniqueItem>(items: T[]): OptionsReturnProps<T>[] =>
  items?.map((item) => ({
    firstLetter: item.title[0].toUpperCase(),
    item
  }));
