import { isDate, isValid, parseISO } from 'date-fns';

import { DateAcceptableType } from '@utils/date/DateUtil';
import collectionDeepDateConvert from '@utils/deepConvertDate';

export const isValidDateString = (value: Date | string): boolean => {
  // date only format
  // eslint-disable-next-line no-useless-escape
  const regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

  if ((typeof value === 'string' && !!value.match(regex)) || !Number.isNaN(+value)) {
    return false;
  }

  return isValid(isDate(value) ? parseISO((value as Date).toISOString()) : parseISO(value as string));
};

export const collectionDeepDateConvertObject = <S>(
  source: S,
  checkerCallback: (value: DateAcceptableType) => boolean,
  converter: (value: string) => string
): void => {
  const keys = Object.keys(source as Object);

  keys.forEach((key: string) => {
    const property = (source as Record<string, string>)[key];

    if (checkerCallback(property) && isValidDateString(property)) {
      (source as Record<string, string>)[key] = converter(property as string);
    } else {
      collectionDeepDateConvert(property, checkerCallback, converter);
    }
  });
};
