import { PropsWithChildren } from 'react';
import { DropdownOptionType } from '@axios/patientEmr/managerPatientEmrTypes';
import { GridProps } from '@mui/material';

export interface MedicalBackgroundTableProps extends PropsWithChildren, GridProps {
  title: string;
  onDelete?: (index: number) => void;
  rows?: MedicalBackgroundTableRow[];
  fieldName?: string;
  index?: number;
  parentFieldName?: string;
}

export type MedicalBackgroundTableRow =
  | IMedicalBackgroundItem[]
  | ((index: number, parentFieldName: string) => JSX.Element[] | null);

export enum MedicalBackgroundItemType {
  Section = 'Section',
  Dropdown = 'Dropdown',
  Input = 'Input',
  Date = 'Date',
  MultipleSelect = 'MultipleSelect'
}

export interface IComponentData {
  type?: MedicalBackgroundItemType;
  dropdownType?: DropdownOptionType;
  tableTitle?: string;
  controlFieldName?: string;
  itemsFieldName?: string;
  rows?: IMedicalBackgroundItem[][];
  additionalLabel?: string;
}

export interface IMedicalBackgroundItem {
  label: string;
  fieldName: string;
  placeholder?: string;
  type?: MedicalBackgroundItemType;
  dropdownType?: DropdownOptionType;
  additionalLabel?: string;
}
