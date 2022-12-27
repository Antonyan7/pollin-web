import { IOrderGroupItem } from 'types/reduxTypes/resultsStateTypes';

export const isAllGroupItemSelected = (groupItems: IOrderGroupItem[]): boolean =>
  groupItems.reduce((allSelected, groupItem) => {
    if (allSelected && groupItem.selected) {
      return groupItem.groupItems !== undefined ? isAllGroupItemSelected(groupItem.groupItems) : true;
    }

    return false;
  }, true);

export const isAnyGroupItemSelected = (groupItems: IOrderGroupItem[]): boolean =>
  groupItems.reduce((anySelected, groupItem) => {
    if (anySelected || groupItem.selected) {
      return true;
    }

    return groupItem.groupItems !== undefined ? isAnyGroupItemSelected(groupItem.groupItems) : false;
  }, false);
