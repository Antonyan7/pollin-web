import { PropsWithChildren } from 'react';
import { GridProps } from '@mui/material';

export interface GroupedItemsProps extends PropsWithChildren, GridProps {
  title: string;
  onDelete?: () => {};
  rows?: IGroupedItemsRowItem[][];
}

export enum GroupedItemsRowItemType {
  Select = 'Select',
  Input = 'Input'
}

export interface IGroupedItemsRowItem {
  label: string;
  fieldName: string;
  placeholder: string;
  type: GroupedItemsRowItemType;
  possibleOptions?: string[];
}
