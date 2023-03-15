import React from 'react';
import { Chip as MuiChip, SxProps, useTheme } from '@mui/material';
import { ChipProps } from '@mui/material/Chip';
import { Theme } from '@mui/material/styles';
import { CSSSelectorObjectOrCssVariables } from '@mui/system';
import { borders, paddings } from 'themes/themeConstants';

interface IChipProps extends ChipProps {
  chipColor?: string;
  sx?: CSSSelectorObjectOrCssVariables<Theme>;
  disabled?: boolean;
  label?: string;
  avatar?: React.ReactElement;
  onDelete?: () => void;
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
    border: `${borders.solid1px}`,
    borderColor: theme.palette.primary.main,
    ':hover': {
      color: theme.palette.primary.light,
      backgroundColor: theme.palette.primary.dark
    }
  };

  switch (chipColor) {
    case 'notActive':
      defaultSX = {
        padding: `${paddings.topBottom16} ${paddings.leftRight36}`,
        color: theme.palette.common.black,
        backgroundColor: theme.palette.grey[100],
        width: '160px',
        border: `${borders.solid1px}`,
        borderColor: theme.palette.grey[100],
        ':hover': {
          color: theme.palette.common.black,
          backgroundColor: theme.palette.grey[300]
        }
      };
      break;

    case 'active':
      defaultSX = {
        padding: `${paddings.topBottom16} ${paddings.leftRight16}`,
        width: '160px',
        color: theme.palette.success[800],
        fontWeight: 500,
        backgroundColor: theme.palette.success.light,
        ':hover': {
          color: theme.palette.success.light,
          backgroundColor: theme.palette.success[800]
        }
      };
      break;
    case 'inActive':
      defaultSX = {
        padding: `${paddings.topBottom16} ${paddings.leftRight16}`,
        width: '160px',
        color: theme.palette.error[800],
        fontWeight: 500,
        backgroundColor: theme.palette.error.light,
        ':hover': {
          color: theme.palette.error.light,
          backgroundColor: theme.palette.error[800]
        }
      };
      break;
    case 'initial':
      defaultSX = {
        padding: `${paddings.topBottom16} ${paddings.leftRight16}`,
        width: '180px',
        color: theme.palette.grey[500],
        fontWeight: 500,
        border: `1px solid ${theme.palette.grey[500]}`,
        backgroundColor: theme.palette.secondary.light,
        ':hover': {
          color: theme.palette.grey[500],
          backgroundColor: theme.palette.secondary.light
        },
        root: {
          width: '500px'
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
        border: `${borders.solid1px}`,
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
