import React, { FunctionComponent, ReactNode, SyntheticEvent } from 'react';
import { ChipProps, SnackbarOrigin, SvgIconProps, Theme } from '@mui/material';

export interface GenericCardProps {
  title?: string;
  primary?: string | number | undefined;
  secondary?: string;
  content?: string;
  image?: string;
  dateTime?: string;
  iconPrimary?: React.ComponentType<SvgIconProps>;
  color?: string;
  size?: string;
}

export interface OverrideIcon {
  overrideIcon: FunctionComponent;
}

export interface LinkTarget {
  target: '_blank' | '_self' | '_parent' | '_top';
}

export interface NavItemType {
  id?: string;
  icon?: GenericCardProps['iconPrimary'];
  target?: boolean;
  external?: string;
  url?: string | undefined;
  type?: string;
  title?: React.ReactNode | string;
  color?: 'primary' | 'secondary' | 'default' | undefined;
  caption?: React.ReactNode | string;
  breadcrumbs?: boolean;
  disabled?: boolean;
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

export interface DefaultRootStateProps {
  user: any;
}

export interface ColorProps {
  readonly [key: string]: string;
}

export interface NavGroupProps {
  item: {
    id?: string;
    type?: string;
    icon?: GenericCardProps['iconPrimary'];
    children?: NavGroupProps['item'][];
    title?: ReactNode | string;
    caption?: ReactNode | string;
    color?: 'primary' | 'secondary' | 'default' | undefined;
    url?: string;
  };
}

export interface MainStyleProps {
  theme: Theme;
  open: boolean;
}

export interface AppointmentsModalProps {
  openAppointmentsModal: boolean;
  handleCloseAppointmentsModal: (e: SyntheticEvent) => void;
}
