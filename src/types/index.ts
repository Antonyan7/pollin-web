import React, { FunctionComponent, ReactNode } from 'react';
import { ChipProps, SnackbarOrigin, SvgIconProps, TableCellProps, Theme } from '@mui/material';

export interface GenericCardProps {
  title?: string;
  primary?: string | number;
  secondary?: string | number;
  content?: string;
  image?: string;
  dateTime?: string;
  iconPrimary?: React.ComponentType<SvgIconProps>;
  color?: string;
  size?: string;
}
export type GetComparator = (o: ArrangementOrder, o1: string) => (a: KeyedObject, b: KeyedObject) => number;
export interface OverrideIcon {
  overrideIcon: FunctionComponent;
}
export interface LinkTarget {
  target: '_blank' | '_self' | '_parent' | '_top';
}
export interface NavItemType {
  id: string;
  icon?: GenericCardProps['iconPrimary'];
  target?: boolean;
  external?: string;
  url?: string;
  type?: string;
  title?: React.ReactNode | string;
  color?: 'primary' | 'secondary' | 'default';
  caption?: React.ReactNode | string;
  breadcrumbs?: boolean;
  disabled?: boolean;
  dataCy?: string;
  chip?: ChipProps;
}
export interface SnackbarStateProps {
  action: boolean;
  open: boolean;
  message: string;
  anchorOrigin: SnackbarOrigin;
  variant: string;
  alertSeverity: 'error' | 'warning' | 'success';
  transition: string;
  close: boolean;
  actionButton: boolean;
}
export interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: string[];
  setSelected: (selected: string[]) => void;
}
export interface KeyedObject {
  [key: string]: string | number | KeyedObject;
}
export type ArrangementOrder = 'asc' | 'desc';
export interface EnhancedTableHeadProps extends TableCellProps {
  onSelectAllClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  order?: ArrangementOrder;
  orderBy?: string;
  rowCount: number;
  onRequestSort: (e: React.SyntheticEvent, property: string) => void;
}
export interface HeadCell {
  id: string;
  numeric: boolean;
  label: string;
  disablePadding?: string | boolean;
  align?: 'left' | 'right' | 'inherit' | 'center' | 'justify';
}
export interface ColorProps {
  readonly [key: string]: string;
}
export interface NavGroupProps {
  item: {
    id: string;
    type?: string;
    icon?: GenericCardProps['iconPrimary'];
    children?: NavGroupProps['item'][];
    title?: ReactNode | string;
    caption?: ReactNode | string;
    color?: 'primary' | 'secondary' | 'default';
    url?: string;
  };
  isLastItem?: boolean;
}
export interface MainStyleProps {
  theme: Theme;
  open: boolean;
}
