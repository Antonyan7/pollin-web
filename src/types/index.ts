import React, { FunctionComponent } from 'react';
import { ChipProps, SnackbarOrigin, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface GenericCardProps {
  title?: string;
  primary?: string | number | undefined;
  secondary?: string;
  content?: string;
  image?: string;
  dateTime?: string;
  iconPrimary?: OverrideIcon['overrideIcon'];
  color?: string;
  size?: string;
}

export interface OverrideIcon {
  overrideIcon:
    | (OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string;
      })
    | React.ComponentClass<any>
    | FunctionComponent<any>;
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
