import React, { ChangeEvent } from 'react';
import { Box, Checkbox, useTheme } from '@mui/material';

import { LineIcon } from '@assets/icons/LineIcon';

const OrderGroupCheckbox = ({
  checkedColor,
  checkedIcon,
  onChange,
  indeterminate,
  checked
}: {
  checkedColor: string;
  checkedIcon: React.ReactNode;
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  indeterminate?: boolean;
  checked: boolean;
}) => {
  const theme = useTheme();

  const checkBoxStyles = {
    checkedStyle: {
      width: '24px',
      height: '24px',
      background: checkedColor,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: `2px solid ${checkedColor}`,
      borderRadius: '4px'
    },
    lineStyle: {
      width: '24px',
      height: '24px',
      background: theme.palette.primary.light,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: `2px solid ${theme.palette.primary.light}`,
      borderRadius: '4px'
    }
  };

  return (
    <Checkbox
      checkedIcon={<Box sx={checkBoxStyles.checkedStyle}>{checkedIcon}</Box>}
      color="default"
      checked={checked}
      indeterminateIcon={
        <Box sx={checkBoxStyles.lineStyle}>
          <LineIcon />
        </Box>
      }
      indeterminate={indeterminate}
      onChange={onChange}
    />
  );
};

export default OrderGroupCheckbox;
