import { DateAcceptableType } from '@utils/date/DateUtil';

import { collectionDeepDateConvertArray } from './deepDateConvertArray';
import { collectionDeepDateConvertObject } from './deepDateConvertObject';

const collectionDeepDateConvert = <S>(
  source: S,
  checkerCallback: (value: DateAcceptableType) => boolean,
  converter: (value: string) => string
): void => {
  if (!source) {
    return;
  }

  if (Array.isArray(source)) {
    collectionDeepDateConvertArray(source, checkerCallback, converter);
  } else if (typeof source === 'object') {
    collectionDeepDateConvertObject(source, checkerCallback, converter);
  }
};

export default collectionDeepDateConvert;
