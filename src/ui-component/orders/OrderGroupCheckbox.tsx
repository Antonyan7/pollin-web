import React, { ChangeEvent } from 'react';
import { Box, Checkbox, useTheme } from '@mui/material';
import { CheckboxProps } from '@mui/material/Checkbox/Checkbox';

import { LineIcon } from '@assets/icons/LineIcon';

interface ICheckBox extends CheckboxProps {
  checkedColor: string;
  checkedIcon: React.ReactNode;
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  indeterminate?: boolean;
  checked?: boolean;
}

const OrderGroupCheckbox = ({
  checkedColor,
  checkedIcon,
  onChange,
  indeterminate,
  checked,
  ...otherProps
}: ICheckBox) => {
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
      {...otherProps}
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
