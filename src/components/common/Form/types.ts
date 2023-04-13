import { PropsWithChildren } from 'react';
import { DropdownOptionType } from '@axios/patientEmr/managerPatientEmrTypes';
import { GridProps } from '@mui/material';

export enum FlexibleItemType {
  Section = 'Section',
  Dropdown = 'Dropdown',
  Input = 'Input',
  Date = 'Date',
  MultipleSelect = 'MultipleSelect'
}

export interface FlexibleSectionTableProps extends PropsWithChildren, GridProps {
  title: string;
  onDelete?: (index: number) => void;
  rows?: FlexibleSectionTableRow[];
  fieldName?: string;
  index?: number;
  parentFieldName?: string;
}

export type FlexibleSectionTableRow =
  | IFlexibleItem[]
  | ((index: number, parentFieldName: string) => JSX.Element[] | null);

export interface IComponentData {
  type?: FlexibleItemType;
  dropdownType?: DropdownOptionType;
  tableTitle?: string;
  controlFieldName?: string;
  itemsFieldName?: string;
  rows?: IFlexibleItem[][];
  additionalLabel?: string;
}

export interface IFlexibleItem {
  label: string;
  fieldName: string;
  placeholder?: string;
  type?: FlexibleItemType;
  dropdownType?: DropdownOptionType;
  additionalLabel?: string;
}

export interface DropdownProps extends Partial<IFlexibleItem> {
  dropdownType?: DropdownOptionType;
}
