import { DateAcceptableType } from '@utils/date/DateUtil';
import collectionDeepDateConvert from '@utils/deepConvertDate';

export const collectionDeepDateConvertArray = <S>(
  source: S[],
  checkerCallback: (value: DateAcceptableType) => boolean,
  converter: (value: string) => string
): void => {
  source.forEach((child) => collectionDeepDateConvert(child, checkerCallback, converter));
};
