import { IServiceType } from 'types/reduxTypes/bookingStateTypes';

export const sortServiceTypesByAlphabeticOrder = (arrayForSort: IServiceType[]) => {
  arrayForSort.sort((a: IServiceType, b: IServiceType) => {
    if (a.title < b.title) {
      return -1;
    }

    if (a.title > b.title) {
      return 1;
    }

    return 0;
  });

  return arrayForSort;
};
