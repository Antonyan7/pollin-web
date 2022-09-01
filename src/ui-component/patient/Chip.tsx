import React from 'react';
import MuiChip, { ChipProps } from '@mui/material/Chip';
import { SxProps, Theme, useTheme } from '@mui/material/styles';

interface IChipProps extends ChipProps {
  chipColor?: string;
  sx?: {};
  disabled?: boolean;
  label?: string;
  avatar?: React.ReactElement | undefined;
  onDelete?: () => void;
  onClick?: () => void;
}

const Chip = ({ chipColor, disabled, sx = {}, variant, ...others }: IChipProps) => {
  const theme = useTheme();

  let defaultSX: SxProps<Theme> = {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
    ':hover': {
      color: theme.palette.primary.light,
      backgroundColor: theme.palette.primary.dark
    }
  };

  let outlineSX = {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
    border: '1px solid',
    borderColor: theme.palette.primary.main,
    ':hover': {
      color: theme.palette.primary.light,
      backgroundColor: theme.palette.primary.dark
    }
  };

  switch (chipColor) {
    case 'notActive':
      defaultSX = {
        padding: '15px 35px',
        color: theme.palette.common.black,
        backgroundColor: theme.palette.grey[100],
        border: '1px solid',
        borderColor: theme.palette.grey[100],
        ':hover': {
          color: theme.palette.common.black,
          backgroundColor: theme.palette.grey[300]
        }
      };
      break;

    default:
  }

  if (disabled) {
    if (variant === 'outlined') {
      outlineSX = {
        color: theme.palette.grey[500],
        backgroundColor: 'transparent',
        border: '1px solid',
        borderColor: theme.palette.grey[500],
        ':hover': {
          color: theme.palette.grey[500],
          backgroundColor: 'transparent'
        }
      };
    } else {
      defaultSX = {
        color: theme.palette.grey[500],
        backgroundColor: theme.palette.grey[50],
        ':hover': {
          color: theme.palette.grey[500],
          backgroundColor: theme.palette.grey[50]
        }
      };
    }
  }

  let SX = defaultSX;

  if (variant === 'outlined') {
    SX = outlineSX;
  }

  SX = { ...SX, ...sx };

  return <MuiChip {...others} sx={SX} />;
};

export default Chip;
