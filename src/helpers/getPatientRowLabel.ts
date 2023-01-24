import { Translation } from 'constants/translations';
import { TFunction } from 'i18next';
// TODO: Change this with i18n provided ways which will include other changes for now it's enough for DEMO.
export const getRowLabel = (age: number, t: TFunction) =>
  t(age > 1 ? Translation.PAGE_RESULTS_LIST_ITEM_DAYS : Translation.PAGE_RESULTS_LIST_ITEM_DAY);
