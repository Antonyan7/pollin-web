import { DateAcceptableType } from '@utils/date/DateUtil';
import collectionDeepDateConvert from '@utils/deepConvertDate';

const isValidDateString = (value: string): boolean => {
  // date only format
  const regex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;

  if (value.match(regex)) {
    return false;
  }

  return !Number.isNaN(Date.parse(value));
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
