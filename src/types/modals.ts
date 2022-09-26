import React from 'react';
import { SxProps, Theme } from '@mui/material/styles';

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
  onClose: () => void;
}
