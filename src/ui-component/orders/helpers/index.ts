import { IOrderGroupItem } from 'types/reduxTypes/resultsStateTypes';

export const isAllGroupItemSelected = (groupItems: IOrderGroupItem[]): boolean =>
  groupItems.reduce((allSelected, groupItem) => {
    if (groupItem.selected === undefined) {
      return groupItem.groupItems !== undefined
        ? allSelected && isAllGroupItemSelected(groupItem.groupItems)
        : allSelected;
    }

    return allSelected && groupItem.selected;
  }, true);

export const isAnyGroupItemSelected = (groupItems: IOrderGroupItem[]): boolean =>
  groupItems.reduce((anySelected, groupItem) => {
    if (groupItem.selected === undefined) {
      return groupItem.groupItems !== undefined
        ? anySelected || isAnyGroupItemSelected(groupItem.groupItems)
        : anySelected;
    }

    return anySelected || groupItem.selected;
  }, false);
