import { IServiceType } from 'types/reduxTypes/bookingStateTypes';

// Sorting by title and checking if first letter is number
export const sortServiceTypesByAlphabeticOrder = (arrayForSort: IServiceType[]) => {
  arrayForSort.sort((a: IServiceType, b: IServiceType) => {
    if (!a.title?.[0].match(/[0-9]/) && a.title < b.title) {
      return -1;
    }

    if (a.title?.[0].match(/[0-9]/) && a.title > b.title) {
      return 1;
    }

    return 0;
  });

  return arrayForSort;
};
